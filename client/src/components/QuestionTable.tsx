import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import { Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';

import { AuthState } from '../reducers/authReducer';
import { bluegrey, richBlack, light, medium, deepDark } from '../utils/colors';
import { questions } from '../utils/questionTableData';

const QuestionTable = ({ mode }: { mode: string }) => {
    const currentUser = useSelector((state: { auth: AuthState }) => state.auth);
    const [data, setData] = useState<any>(null);
    const [selectedOption, setSelectedOption] = useState<{
        [key: number]: number | null;
    }>({
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        7: null,
        8: null,
        9: null,
        10: null,
        11: null,
        12: null,
        13: null,
        14: null,
        15: null,
        16: null,
        17: null,
        18: null,
        19: null,
        20: null,
        21: null,
        22: null,
        23: null,
        24: null,
        25: null,
    });

    ChartJS.register(
        RadialLinearScale,
        PointElement,
        LineElement,
        Filler,
        Tooltip,
        Legend
    );

    const chartOptions = {
        scales: {
            r: {
                max: 3,
                min: 0,
                ticks: {
                    stepSize: 0.5,
                },
            },
        },
    };

    const formSubmitHandler = () => {
        const values = Object.values(selectedOption);
        if (values.includes(null)) {
            alert('Please answer all the questions');
            return;
        }
        let ocd = 0,
            adhd = 0,
            depression = 0,
            anxiety = 0,
            ptsd = 0;
        for (let i = 0; i < 25; i++) {
            if (questions[i].disorder === 'ocd') {
                ocd += selectedOption[i + 1] ?? 0;
            } else if (questions[i].disorder === 'ADHD') {
                adhd += selectedOption[i + 1] ?? 0;
            } else if (questions[i].disorder === 'depression') {
                depression += selectedOption[i + 1] ?? 0;
            } else if (questions[i].disorder === 'anxiety') {
                anxiety += selectedOption[i + 1] ?? 0;
            } else if (questions[i].disorder === 'PTSD') {
                ptsd += selectedOption[i + 1] ?? 0;
            }
        }
        ocd = Math.round(ocd / 5);
        adhd = Math.round(adhd / 5);
        depression = Math.round(depression / 5);
        anxiety = Math.round(anxiety / 5);
        ptsd = Math.round(ptsd / 5);
        setData({
            labels: ['OCD', 'ADHD', 'Depression', 'Anxiety', 'PTSD'],
            datasets: [
                {
                    label: `${currentUser.name}'s Results`,
                    data: [ocd, adhd, depression, anxiety, ptsd],
                    fill: true,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                    pointBackgroundColor: 'rgb(255, 99, 132)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 99, 132)',
                },
            ],
        });
        ocd = 0;
        adhd = 0;
        depression = 0;
        anxiety = 0;
        ptsd = 0;
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Table
                sx={{
                    minWidth: 650,
                    backgroundColor: mode === 'light' ? '#DBFFF1' : richBlack,
                    border: 'none',
                    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
                    borderRadius: '15px',
                }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell
                            sx={{
                                backgroundColor: mode === 'light' ? medium : deepDark,
                                borderRadius: '15px 0 0 0',
                                border: 'none',
                            }}
                        >
                            <Typography
                                variant="h4"
                                component="h4"
                                sx={{
                                    color: mode === 'light' ? deepDark : richBlack,
                                    fontFamily: 'Work Sans',
                                    fontWeight: 'medium',
                                    fontSize: '1.3rem',
                                    padding: '1rem',
                                }}
                            >
                                Situations/Questions you may have experienced
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {questions.map((question) => (
                        <TableRow key={question.id}>
                            <TableCell
                                sx={{
                                    color: mode === 'light' ? deepDark : light,
                                    border: 'none',
                                    boxShadow: 'none',
                                    borderRadius: 'none',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    p: 3,
                                    pb: 1,
                                }}
                                component="th"
                                scope="row"
                            >
                                <Typography
                                    variant="h4"
                                    component="h4"
                                    sx={{
                                        color: mode === 'light' ? deepDark : light,
                                        m: '1rem',
                                        mt: '2px',
                                        mr: '2rem',
                                        fontFamily: 'Work Sans',
                                        fontWeight: 'medium',
                                        fontSize: '1.5rem',
                                        textAlign: 'center',
                                    }}
                                >
                                    {question.id}
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Typography
                                        variant="h4"
                                        component="h5"
                                        sx={{
                                            color: mode === 'light' ? deepDark : light,
                                            fontWeight: 'medium',
                                            fontSize: '1.1rem',
                                            textAlign: 'left',
                                        }}
                                    >
                                        {question.question}
                                    </Typography>
                                    <RadioGroup
                                        row
                                        sx={{
                                            mb: '1.3rem',
                                        }}
                                        name={question.id.toString()}
                                        value={selectedOption[question.id]}
                                        onChange={(e) =>
                                            setSelectedOption({
                                                ...selectedOption,
                                                [question.id]: parseInt(e.target.value),
                                            })
                                        }
                                    >
                                        <FormControlLabel
                                            sx={{
                                                mr: '2rem',
                                            }}
                                            value={0}
                                            label="Not at all"
                                            control={<Radio color="success" />}
                                        />
                                        <FormControlLabel
                                            sx={{
                                                mr: '2rem',
                                            }}
                                            value={1}
                                            control={<Radio color="success" />}
                                            label="Some of the days"
                                        />
                                        <FormControlLabel
                                            sx={{
                                                mr: '2rem',
                                            }}
                                            value={2}
                                            label="Most of the days"
                                            control={<Radio color="success" />}
                                        />
                                        <FormControlLabel
                                            value={3}
                                            label="Nearly every day"
                                            control={<Radio color="success" />}
                                        />
                                    </RadioGroup>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button
                color="success"
                variant="contained"
                sx={{
                    p: 1,
                    px: 4,
                    mt: 3,
                    backgroundColor: mode === 'light' ? medium : light,
                    color: bluegrey,
                    font: '500 1.2rem Poppins, sans-serif',
                    ':hover': {
                        backgroundColor: medium,
                        color: 'black',
                    },
                    borderRadius: '15px',
                    textTransform: 'none',
                }}
                onClick={formSubmitHandler}
            >
                Give me my results!
            </Button>
            {data && (
                <Box
                    sx={{
                        backgroundColor: mode === 'light' ? '#DBFFF1' : richBlack,
                        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
                        mt: 3,
                        p: '2rem',
                        borderRadius: '15px',
                        border: mode === 'light' ? 'none' : `1px solid ${light}`,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        width: '100%',
                    }}
                >
                    <Box>
                        <Typography
                            variant="h2"
                            component="h3"
                            sx={{
                                mb: '1rem',
                                color: mode === 'light' ? deepDark : light,
                                fontWeight: '600',
                                fontSize: '2rem',
                                textAlign: 'left',
                                display: 'flex',
                                alignItems: 'left',
                            }}
                        >
                            Results
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: 'azure',
                            borderRadius: '15px',
                            border:
                                mode === 'light'
                                    ? `1px solid ${deepDark}`
                                    : `1px solid ${light}`,
                            display: 'grid',
                            placeItems: 'center',
                            height: '450px',
                            padding: '1rem',
                        }}
                    >
                        <Radar options={chartOptions} data={data} redraw={true} />
                    </Box>
                    <Box
                        sx={{
                            mt: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography
                            sx={{
                                font: '400 1.1rem Work Sans, sans-serif',
                                color: mode === 'light' ? deepDark : light,
                                textAlign: 'left',
                                display: 'flex',
                                alignItems: 'left',
                            }}
                        >
                            The radar chart you see represents your scores in different
                            areas of mental health disorders. Each point on the chart
                            represents a score on a scale of 0-3, with 0 indicating no
                            symptoms and 3 indicating severe symptoms.
                            <br />
                            <br />
                            Please note that this chart is not a substitute for
                            professional medical advice and should not be used to diagnose
                            or treat any condition. If you have any concerns about your
                            mental health, we strongly recommend that you speak with a
                            healthcare professional.
                            <br />
                            <br />
                            You can share this chart with people you trust, but it's not
                            intended to be used as a diagnostic tool.
                        </Typography>
                    </Box>
                </Box>
            )}
        </div>
    );
};

export default QuestionTable;
