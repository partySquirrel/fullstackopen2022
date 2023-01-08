interface Result {
    periodLength: number;
    trainingDays: number;
    rating: number;
    target: number;
    average: number;
    ratingDescription: string;
    success: boolean;
}

const calculateExercises = (dailyHours: number[], targetHours: number): Result => {
    const days = dailyHours.length;
    const training = dailyHours.filter(a => a > 0).length;
    const sum = dailyHours.reduce((a, b) => a + b, 0);
    const average = (sum / days) || 0;
    const success = average >= targetHours;

    // under 75% = 1
    // 75% of target = 2
    // 100% or more = 3
    const completion = 100 * average / targetHours;
    let rate: [number, string];
    if (completion < 75) {
        rate = [1, 'goal was not achieved'];
    } else if (completion < 100) {
        rate = [2, 'not too bad but could be better'];
    } else if (completion >= 100) {
        rate = [3, 'goal achieved'];
    }

    return {
        periodLength: days,
        trainingDays: training,
        success: success,
        rating: rate[0],
        ratingDescription: rate[1],
        target: targetHours,
        average: average
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));