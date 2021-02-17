import _ from "lodash";

import * as NovaMethods from "./public-api";


function combinate<O extends Record<string | number, any[]>>(obj: O) {
    let combos: { [k in keyof O]: O[k][number] }[] = [];
    // tslint:disable-next-line: forin
    for (const key in obj) {
        const values = obj[key];
        const all = [];
        for (let i = 0; i < values.length; i++) {
            for (let j = 0; j < (combos.length || 1); j++) {
                const newCombo = { ...combos[j], [key]: values[i] };
                all.push(newCombo);
            }
        }
        combos = all;
    }
    return combos;
}

fdescribe("lodash replacement >", () => {
    const METHODS = [
        {
            key: "get",
            argsNum: 2,
        },
    ];

    const TESTING_INPUT = [
        undefined,
        null,
        NaN,
        "string value ",
        "customPath",
        123,
        "123",
        { x: 1 },
        {
            customPath: {
                y: "asd",
            },
        },
    ];

    METHODS.forEach(method => {
        const novaMethod = (<Record<string, any>>NovaMethods)[method.key];
        const lodashMethod = (<Record<string, any>>_)[method.key];

        if (novaMethod && lodashMethod) {
            const values: Record<string, typeof TESTING_INPUT> = {};
            const keys = Array.from({ length: method.argsNum }).map((v, i) => i + 1);
            // tslint:disable-next-line: forin
            for (const key in keys) {
                values[key] = TESTING_INPUT;
            }

            const combos = combinate(values);

            combos.forEach(combo => {
                const args = Object.values(combo);

                it(`Method: ${method.key} | args: ${args} | should be as lodash`, () => {
                    let novaResult;
                    try {
                        novaResult = novaMethod(...args);
                    } catch (error) {
                        novaResult = "ERROR";
                    }

                    let lodashResult;
                    try {
                        lodashResult = novaMethod(...args);
                    } catch (error) {
                        lodashResult = "ERROR";
                    }

                    expect(novaResult).toEqual(lodashResult);
                });
            });
        }
    });
});
