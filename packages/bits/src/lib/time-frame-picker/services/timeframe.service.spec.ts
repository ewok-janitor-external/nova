import keyBy from "lodash/keyBy";
import mapValues from "lodash/mapValues";
import moment, { Moment } from "moment/moment";

import { ITimeframe, ITimeFramePreset, ITimeFramePresetDictionary } from "../public-api";

import { TimeframeService } from "./timeframe.service";

describe("services >", () => {
    describe("timeframe >", () => {

        let timeframeService: TimeframeService;

        beforeEach(() => {
            timeframeService = new TimeframeService();
        });

        it("should non-zero number of default presets", () => {
            const presets = timeframeService.getDefaultPresets();

            expect(Object.keys(presets).length).not.toBe(0);
        });

        it("should return correct time frame", () => {
            const baseTime = "2015-02-02T10:00:00.000Z";
            const presets = timeframeService.getTimeframe({ days: -7 }, {}, baseTime);

            expect(presets.startDatetime.toISOString()).toBe("2015-01-26T10:00:00.000Z");
            expect(presets.endDatetime.toISOString()).toBe(baseTime);
        });

        it("should return correct time frame for specified preset", () => {
            const baseTime = "2015-02-02T10:00:00.000Z";
            const presets = timeframeService.getTimeframeByPresetId("lastHour", baseTime);

            expect(presets.startDatetime.toISOString()).toBe("2015-02-02T09:00:00.000Z");
            expect(presets.endDatetime.toISOString()).toBe("2015-02-02T10:00:00.000Z");
        });

        it("should return correct time frame for custom preset", () => {
            const customPreset = {
                lastDay: {
                    name: "Last day",
                    startDatetimePattern: { days: -1 },
                    endDatetimePattern: {},
                },
                lastMonth: {
                    name: "Last month",
                    startDatetimePattern: { months: -1 },
                    endDatetimePattern: {},
                },
            };
            timeframeService.extendCurrentPresets(customPreset);
            const baseTime = "2015-02-02T10:00:00.000Z";
            const presets = timeframeService.getTimeframeByPresetId("lastMonth", baseTime);

            expect(presets.startDatetime.toISOString()).toBe("2015-01-02T10:00:00.000Z");
            expect(presets.endDatetime.toISOString()).toBe("2015-02-02T10:00:00.000Z");
        });

        it("should shift time frame by duration", () => {
            const duration = 1234;
            const timeFrame: ITimeframe = {
                startDatetime: moment([2000]).add({ days: -1 }),
                endDatetime: moment([2000]),
                selectedPresetId: "lastDayOfMillennium",
            };
            const nextTimeFrame = timeframeService.shiftTimeFrame(timeFrame, moment.duration(duration));
            const prevTimeFrame = timeframeService.shiftTimeFrame(timeFrame, moment.duration(-duration));

            expect(nextTimeFrame.startDatetime.diff(timeFrame.startDatetime)).toEqual(duration);
            expect(nextTimeFrame.endDatetime.diff(timeFrame.endDatetime)).toEqual(duration);
            expect(nextTimeFrame.selectedPresetId).toBeNull();

            expect(prevTimeFrame.startDatetime.diff(timeFrame.startDatetime)).toEqual(-duration);
            expect(prevTimeFrame.endDatetime.diff(timeFrame.endDatetime)).toEqual(-duration);
            expect(prevTimeFrame.selectedPresetId).toBeNull();

        });

        it("should return the timeframe duration", () => {
            const timeFrame: ITimeframe = {
                startDatetime: moment([2000]).add({ days: -1 }),
                endDatetime: moment([2000]),
                selectedPresetId: "lastDayOfMillennium",
            };
            const duration = timeframeService.getDuration(timeFrame);

            expect(duration.asDays()).toEqual(1);
        });

        describe("cloneTimeFrame", () => {
            let testTimeFrame: ITimeframe;
            beforeEach(() => {
                testTimeFrame = {
                    startDatetime: moment([2000]).add({ days: -1 }),
                    endDatetime: moment([2000]),
                    selectedPresetId: "lastDayOfMillennium",
                    title: "Last Day of the Millennium",
                };
            });

            it("should preserve the values of all incoming properties", () => {
                const clonedTimeframe = TimeframeService.cloneTimeFrame(testTimeFrame);
                Object.keys(testTimeFrame).forEach(key => {
                    expect(testTimeFrame[<keyof ITimeframe>key]).toEqual(clonedTimeframe[<keyof ITimeframe>key]);
                });
            });

            it("should make clones of the start and end datetimes", () => {
                const clonedTimeframe = TimeframeService.cloneTimeFrame(testTimeFrame);
                expect(clonedTimeframe.startDatetime).not.toBe(testTimeFrame.startDatetime);
                expect(clonedTimeframe.endDatetime).not.toBe(testTimeFrame.endDatetime);
            });
        });

        describe("updateTimeFrame", () => {
            let initialTimeFrame: ITimeframe;
            let updatedTimeFrame: ITimeframe;

            function timeFrameFactory(startDatetime: Moment, endDatetime: Moment, selectedPresetId: string, title?: string): ITimeframe {
                return { startDatetime, endDatetime, selectedPresetId, title };
            }

            function easyPreset(value: string): ITimeFramePreset {
                return {
                    name: "Last ${value}",
                    startDatetimePattern: { [value]: -1 },
                    endDatetimePattern: {},
                };
            }
            const presetStrings: string[] = ["day", "week"];
            const testPresets: ITimeFramePresetDictionary = mapValues(keyBy(presetStrings), easyPreset);
            const baseDate = moment([2000]);

            it("should use baseDate provided for pattern calculations", () => {
                const presetId = presetStrings[1];
                // @ts-ignore: Suppressing error for testing purposes
                initialTimeFrame = timeFrameFactory(undefined, undefined, presetId, testPresets[presetId].name);
                updatedTimeFrame = timeframeService.reconcileTimeframe(initialTimeFrame, testPresets, baseDate);

                expect(updatedTimeFrame.endDatetime).toEqual(baseDate);
            });

            it("should use now() if baseDate is not provided", () => {
                const presetId = presetStrings[1];
                // @ts-ignore: Suppressing error for testing purposes
                initialTimeFrame = timeFrameFactory(undefined, undefined, presetId, testPresets[presetId].name);
                updatedTimeFrame = timeframeService.reconcileTimeframe(initialTimeFrame, testPresets);

                expect(moment().diff(updatedTimeFrame.endDatetime)).toBeLessThan(100); // up to 100ms difference allowed
            });

            it("should use currentPresets if no presets passed", () => {
                const currentPresets = timeframeService.currentPresets;
                const presetId = Object.keys(currentPresets)[0];
                // @ts-ignore: Suppressing error for testing purposes
                initialTimeFrame = timeFrameFactory(undefined, undefined, presetId, currentPresets[presetId].name);
                updatedTimeFrame = timeframeService.reconcileTimeframe(initialTimeFrame);
                expect(updatedTimeFrame).toBeTruthy();
            });

            it("should return cloned timeFrame with unapplicable selectedPresetId", () => {
                const presetId = presetStrings[0];
                initialTimeFrame = timeFrameFactory(baseDate, baseDate, presetId, testPresets[presetId].name);
                updatedTimeFrame = timeframeService.reconcileTimeframe(initialTimeFrame);

                expect(updatedTimeFrame).toEqual(initialTimeFrame);
                expect(updatedTimeFrame).not.toBe(initialTimeFrame);
            });

            describe("if selectedPresetId is set", () => {
                beforeEach(() => {
                    const presetId = presetStrings[0];
                    // @ts-ignore: Suppressing error for testing purposes
                    initialTimeFrame = timeFrameFactory(undefined, undefined, presetId, "my title");
                    updatedTimeFrame = timeframeService.reconcileTimeframe(initialTimeFrame, testPresets);
                });

                it("should fill start and end dates", () => {
                    expect(updatedTimeFrame.startDatetime).toBeTruthy();
                    expect(updatedTimeFrame.endDatetime).toBeTruthy();
                });

                it("should preserve title", () => {
                    expect(updatedTimeFrame.title).toEqual(initialTimeFrame.title);
                });
            });

            describe("if selectedPresetId is not set", () => {
                beforeEach(() => {
                    // @ts-ignore: Suppressing error for testing purposes
                    initialTimeFrame = timeFrameFactory(moment([1999]), moment([2000]), null);
                    updatedTimeFrame = timeframeService.reconcileTimeframe(initialTimeFrame);
                });

                it("should clone start and end dates", () => {
                    expect(updatedTimeFrame.startDatetime).toEqual(initialTimeFrame.startDatetime);
                    expect(updatedTimeFrame.startDatetime).not.toBe(initialTimeFrame.startDatetime);

                    expect(updatedTimeFrame.endDatetime).toEqual(initialTimeFrame.endDatetime);
                    expect(updatedTimeFrame.endDatetime).not.toBe(initialTimeFrame.endDatetime);
                });

                it("should preserve selectedPresetId and title", () => {
                    expect(updatedTimeFrame.selectedPresetId).toEqual(initialTimeFrame.selectedPresetId);
                    expect(updatedTimeFrame.title).toEqual(initialTimeFrame.title);
                });
            });

        });

    });
});
