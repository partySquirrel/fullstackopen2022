interface ExerciseValues {
    targetHours: number;
    dailyHours: number[];
}

const parseExerciseArguments = (args: Array<string>): ExerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    let targetHours = 0;
    if (!isNaN(Number(args[2]))) {
        targetHours = Number(args[2]);
    } else {
        throw new Error(`Provided target value ${args[2]} was not number!`);
    }
    const dailyHours: number[] = [];
    for (let i = 3; i < args.length; i++) {
        if (!isNaN(Number(args[i]))) {
            dailyHours.push(Number(args[i]));
        } else {
            throw new Error(`Provided daily value ${args[i]} was not number!`);
        }
    }
    return {
        targetHours: targetHours,
        dailyHours: dailyHours
    }
}

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

try {
    const {targetHours, dailyHours} = parseExerciseArguments(process.argv);
    console.log(calculateExercises(dailyHours, targetHours));

} catch (error: unknown) {
    let errorMessage = '';
    if (error instanceof Error) {
        errorMessage = ' Error: ' + error.message;
    } else {
        errorMessage = 'Something bad happened.';
    }
    console.log(errorMessage);
}