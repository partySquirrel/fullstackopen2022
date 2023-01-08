import express from "express";
import calculate from './bmiCalculator';

const app = express();
app.use(express.json())

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
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
        }
        res.send(result);

    } else {
        res.status(400).json({
            error: "malformed parameters"
        })
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});