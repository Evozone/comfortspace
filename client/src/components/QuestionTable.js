// Component to display the questions in a table

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
    bluegrey,
    richBlack,
    light,
    medium,
    dark,
    deepDark,
    superLight,
} from './colors';

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
import Typography from '@mui/material/Typography';

import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { Tooltip as Tooltip1 } from '@mui/material';

import { Button } from '@mui/material';

import { questions } from './QuestionTableData';

export default function QuestionTable({ mode }) {
    const [selectedOption, setSelectedOption] = useState({
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
    const [data, setData] = useState(null);

    const formSubmitHandler = () => {
        let ocd = 0,
            ADHD = 0,
            depression = 0,
            anxiety = 0,
            PTSD = 0;
        for (let i = 0; i < 25; i++) {
            if (questions[i].disorder === 'ocd') ocd += selectedOption[i + 1];
            else if (questions[i].disorder === 'ADHD')
                ADHD += selectedOption[i + 1];
            else if (questions[i].disorder === 'depression')
                depression += selectedOption[i + 1];
            else if (questions[i].disorder === 'anxiety')
                anxiety += selectedOption[i + 1];
            else if (questions[i].disorder === 'PTSD')
                PTSD += selectedOption[i + 1];

            console.log(ocd, ADHD, depression, anxiety, PTSD);
        }
        setData({
            labels: ['OCD', 'ADHD', 'Depression', 'Anxiety', 'PTSD'],
            datasets: [
                {
                    label: 'Your Analysis',
                    data: [ocd, ADHD, depression, anxiety, PTSD],
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
    };
    console.log(selectedOption);
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
                                backgroundColor:
                                    mode === 'light' ? medium : deepDark,
                                borderRadius: '15px 0 0 0',
                                border: 'none',
                            }}
                        >
                            <Typography
                                variant='h4'
                                component='h4'
                                sx={{
                                    color:
                                        mode === 'light' ? deepDark : richBlack,
                                    fontFamily: 'Work Sans',
                                    fontWeight: 'medium',
                                    fontSize: '1.3rem',
                                    padding: '1rem',
                                }}
                            >
                                Situations/Questions you may have experienced
                            </Typography>
                        </TableCell>
                        <TableCell
                            sx={{
                                backgroundColor:
                                    mode === 'light' ? medium : deepDark,
                                borderRadius: '0 15px 0 0',
                                border: 'none',
                            }}
                            align='center'
                        >
                            <Typography
                                variant='h3'
                                component='h4'
                                sx={{
                                    color:
                                        mode === 'light' ? deepDark : richBlack,
                                    fontFamily: 'Work Sans',
                                    fontWeight: 'medium',
                                    fontSize: '1.3rem',
                                    textAlign: 'center',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                Options
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
                                    width: '50rem',
                                }}
                                component='th'
                                scope='row'
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography
                                        variant='h4'
                                        component='h4'
                                        sx={{
                                            color:
                                                mode === 'light'
                                                    ? deepDark
                                                    : light,
                                            margin: '1rem',
                                            mr: '2rem',
                                            fontFamily: 'Work Sans',
                                            fontWeight: 'medium',
                                            fontSize: '1.5rem',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {question.id}
                                    </Typography>
                                    <Typography
                                        variant='h4'
                                        component='h5'
                                        sx={{
                                            color:
                                                mode === 'light'
                                                    ? deepDark
                                                    : light,
                                            fontFamily: 'Work Sans',
                                            fontWeight: 'medium',
                                            fontSize: '1.1rem',
                                            textAlign: 'left',
                                        }}
                                    >
                                        {question.question}
                                    </Typography>
                                </Box>
                            </TableCell>

                            {/* This is the Radio buttons */}
                            <TableCell
                                sx={{
                                    border: 'none',
                                    boxShadow: 'none',
                                    borderRadius: 'none',
                                    margin: '0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <RadioGroup
                                    row
                                    aria-label={question.id}
                                    name={question.id}
                                    value={selectedOption[question.id]}
                                    onChange={(e) =>
                                        setSelectedOption({
                                            ...selectedOption,
                                            [question.id]: parseInt(
                                                e.target.value
                                            ),
                                        })
                                    }
                                >
                                    <Tooltip1
                                        title='Not at all'
                                        placement='top'
                                    >
                                        <FormControlLabel
                                            value={0}
                                            control={<Radio color='primary' />}
                                        />
                                    </Tooltip1>
                                    <Tooltip1
                                        title='Some of the days'
                                        placement='top'
                                    >
                                        <FormControlLabel
                                            value={1}
                                            control={<Radio color='primary' />}
                                        />
                                    </Tooltip1>
                                    <Tooltip1
                                        title='Most of the days'
                                        placement='top'
                                    >
                                        <FormControlLabel
                                            value={2}
                                            control={<Radio color='primary' />}
                                        />
                                    </Tooltip1>
                                    <Tooltip1
                                        title='Nearly every day'
                                        placement='top'
                                    >
                                        <FormControlLabel
                                            value={3}
                                            control={<Radio color='primary' />}
                                        />
                                    </Tooltip1>
                                </RadioGroup>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Test submit button */}
            <Button
                color='success'
                variant='contained'
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

            {/* Radar chart */}
            {data && (
                <Box
                    sx={{
                        backgroundColor:
                            mode === 'light' ? '#DBFFF1' : richBlack,
                        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
                        mt: 3,
                        p: '2rem',
                        borderRadius: '15px',
                        border:
                            mode === 'light' ? 'none' : `1px solid ${light}`,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        width: '100%',
                    }}
                >
                    {/* Header */}
                    <Box>
                        <Typography
                            variant='h2'
                            component='h3'
                            sx={{
                                mb: '1rem',
                                fontFamily: 'Poppins, Work Sans',
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
                    {/* Chart */}
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
                        <Radar data={data} />
                    </Box>
                    {/* Share it message */}
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
                            The radar chart you see represents your scores in
                            different areas of mental health disorders. Each
                            point on the chart represents a score on a scale of
                            0-3, with 0 indicating no symptoms and 3 indicating
                            severe symptoms.
                            <br />
                            <br />
                            Please note that this chart is not a substitute for
                            professional medical advice and should not be used
                            to diagnose or treat any condition. If you have any
                            concerns about your mental health, we strongly
                            recommend that you speak with a healthcare
                            professional.
                            <br />
                            <br />
                            You can share this chart with people you trust, but
                            it's not intended to be used as a diagnostic tool.
                            <br />
                            Right click on the chart and select "Copy image" or
                            "Save image as..." to save the chart to your
                            computer.
                        </Typography>
                    </Box>
                </Box>
            )}
        </div>
    );
}
