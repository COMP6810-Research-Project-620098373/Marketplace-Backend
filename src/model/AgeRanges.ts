export const AgeRanges = {
    // baby: {
    //     min: 0,
    //     max: 2
    // },
    // toddler: {
    //     min: 2,
    //     max: 3
    // },
    child: {
        min: 0,
        max: 12,
    },
    adolescent: {
        min: 12,
        max: 18,
    },
    youngAdult: {
        min: 18,
        max: 25,
    },
    adult: {
        min: 25,
        max: 40,
    },
    middleAgedAdult: {
        min: 40,
        max: 50,
    },
    senior: {
        min: 60,
        max: 150,
    }
}


interface Range {
    min: number,
    max: number | undefined
} 