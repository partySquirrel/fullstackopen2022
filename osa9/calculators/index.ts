import express from "express";
import calculate from './bmiCalculator';
import exercises from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target} = req.body;

    if (!daily_exercises || !target) {
        res.status(400).json({
            error: "parameters missing"
        });
        return;
    }

    let targetHours = 0;
    if (!isNaN(Number(target))) {
        targetHours = Number(target);
    } else {
        res.status(400).json({
            error: "target is not a number"
        });
        return;
    }

    if (!Array.isArray(daily_exercises)) {
        res.status(400).json({
            error: "daily_exercises is not an array"
        });
        return;
    }

    const input_daily = daily_exercises as number[];
    const dailyHours: number[] = [];
    for (let i = 0; i < input_daily.length; i++) {
        if (!isNaN(Number(input_daily[i]))) {
            dailyHours.push(Number(input_daily[i]));
        } else {
            res.status(400).json({
                error: "daily_exercises contained value that is not a number"
            });
            return;
        }
    }

    const result = exercises(dailyHours, targetHours);
    res.json(result);
});

app.get('/bmi', (req, res) => {
    const ph = req.query.height;
    const pw = req.query.weight;
    if (ph && !isNaN(Number(ph)) &&
        pw && !isNaN(Number(pw))) {

        const result = {
            weight: Number(pw),
            height: Number(ph),
            bmi: calculate(Number(ph), Number(pw))
        };
        res.json(result);

    } else {
        res.status(400).json({
            error: "malformed parameters"
        });
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});