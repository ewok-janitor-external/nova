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
            key: "pull",
            argsNum: 2,
        },
        {
            key: "get",
            argsNum: 2,
        },
        {
            key: "isEmpty",
            argsNum: 1,
        },
        {
            key: "isNil",
            argsNum: 1,
        },
        {
            key: "uniq",
            argsNum: 1,
        },
        {
            key: "sortBy",
            argsNum: 2,
        },
        // {
        //     key: "debounce",
        //     argsNum: 3,
        // },
        {
            key: "size",
            argsNum: 1,
        },
        {
            key: "forEach",
            argsNum: 2,
        },
        {
            key: "assign",
            argsNum: 2,
        },
        {
            key: "has",
            argsNum: 2,
        },
        {
            key: "chunk",
            argsNum: 2,
        },
        {
            key: "last",
            argsNum: 1,
        },
        {
            key: "reject",
            argsNum: 2,
        },
        {
            key: "keyBy",
            argsNum: 2,
        },
    ];

    const TESTING_INPUT: any[] = [
        undefined,
        null,
        NaN,
        0,
        "string value",
        "customPath",
        123,
        "123",
        "x",
        "y",
        "",
        { x: 1 },
        {
            customPath: {
                y: "asd",
            },
        },
        {},
        [],
        () => {},
        (obj: Record<string, unknown>, key: string) => obj[key],
        (arr: any[], key: number) => arr[key],
        (arr: any[], key: number) => arr[1],
        (o: Record<string, any>) => String.fromCharCode(o.code),
        [
            { "dir": "left", "code": 97 },
            { "dir": "right", "code": 100 },
        ],
        [1, 2, 3, 123],
        [undefined],
        ["1", "2", "3", "123"],
        2,
        -12,
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

                let novaResult: any;
                const novaArgs = [...args];
                try {
                    novaResult = novaMethod(...novaArgs);
                } catch (error) {
                    novaResult = "ERROR";
                }

                let lodashResult: any;
                const lodashArgs = [...args];
                try {
                    lodashResult = lodashMethod(...lodashArgs);
                } catch (error) {
                    lodashResult = "ERROR";
                }

                it(`Method: ${method.key} | args: ${JSON.stringify(args)} | should be as lodash.
                    \nNova result: ${JSON.stringify(novaResult)} Lodash result: ${JSON.stringify(lodashResult)}
                    \nNova args: ${JSON.stringify(novaArgs)}; Lodash args: ${JSON.stringify(lodashArgs)}
                    `, () => {

                    if (novaResult) {
                        expect(novaResult).toEqual(lodashResult);
                    } else {
                        expect([lodashResult, undefined, null].includes(novaResult)).toEqual(true);
                    }
                    expect(JSON.stringify(novaArgs)).toEqual(JSON.stringify(lodashArgs));
                });
            });
        }
    });
});
