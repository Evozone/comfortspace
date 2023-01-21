// Component to display the questions in a table

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Typography from '@mui/material/Typography';

import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Tooltip from '@mui/material/Tooltip';

import { bluegrey, richBlack, light, medium, dark, deepDark } from './colors';

const questions = [
    {
        id: 1,
        question: "Feeling bad about yourself - or that you are a failure or have let yourself or your family down.",
        disorder: 'depression'
    },
    {
        id: 2,
        question: "Feeling afraid, as if something awful might happen.",
        disorder: 'anxiety'
    },
    {
        id: 3,
        question: "Had nightmares about the event(s) or thought about the event(s) when you did not want to?",
        disorder: 'ptsd'
    },
    {
        id: 4,
        question: "Do you ever experience unwanted repetitive and persistent thoughts that cause you anxiety?",
        disorder: 'ocd'
    },
    {
        id: 5,
        question: "How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?",
        disorder: 'adhd'
    },
    {
        id: 6,
        question: "Moving or speaking so slowly that other people could have noticed Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual.",
        disorder: "depression"
    },
    {
        id: 7,
        question: "Being so restless that it is hard to sit still?",
        disorder: "anxiety"
    },
    {
        id: 8,
        question: "Tried hard not to think about the event(s) or went out of your way to avoid situations that reminded you of some past traumatic event(s)?",
        disorder: "ptsd"
    },
    {
        id: 9,
        question: "Do you attempt to ignore/suppress these unwanted thoughts/images or engage in another activity (i.e. counting, hand washing, checking repeatedly to be sure doors are locked) to neutralize them and if so how often?",
        disorder: "ocd"
    },
    {
        id: 10,
        question: "How often do you have difficulty getting things in order when you have to do a task that requires organization?",
        disorder: "ADHD"
    },
    {
        id: 11,
        question: "If you checked off any problems, how difficult have these problems made it for you at work, home, or with other people?",
        disorder: "depression"
    },
    {
        id: 12,
        question: "Not being able to stop or control worrying:",
        disorder: "anxiety"
    },
    {
        id: 13,
        question: "Been constantly on guard, watchful, or easily startled?",
        disorder: "PTSD"
    },
    {
        id: 14,
        question: "Do you experience the need to constantly check on something (i.e. repeatedly checking to be sure doors are locked, light switches and/or appliances are off) or arrange the order of things (a shelf in a bedroom or a kitchen cabinet, for example)?",
        disorder: "ocd"
    },
    {
        id: 15,
        question: "How often do you have problems remembering appointments or obligations?",
        disorder: "adhd"
    },
    {
        id: 16,
        question: "Trouble concentrating on things, such as reading the newspaper or watching television",
        disorder: "depression"
    },
    {
        id: 17,
        question: "Worrying too much about different things",
        disorder: "anxiety"
    },
    {
        id: 18,
        question: "Tried to avoid somewhat similar type of situation from your past experience?",
        disorder: 'ptsd'
    },
    {
        id: 19,
        question: "Is your job performance, home life, or social relationships significantly affected by your obsessive thinking or ritual behaviors? ",
        disorder: 'ocd'
    },
    {
        id: 20,
        question: "When you have a task that requires a lot of thought, how often do you avoid or delay getting started?",
        disorder: 'adhd'
    },
    {
        id: 21,
        question: "Feeling tired or having little energy and Trouble falling or staying asleep, or sleeping too much",
        disorder: 'depression'
    },
    {
        id: 22,
        question: "Feeling nervous, anxious, or on edge",
        disorder: 'anxiety'
    },
    {
        id: 23,
        question: "Have you felt guilty or unable to stop blaming yourself or others for the event(s) or any problems the event(s) may have caused?",
        disorder: 'ptsd'
    },
    {
        id: 24,
        question: "Do you spend at least one hour a day thinking obsessive thoughts or performing ritualistic behavior in an attempt to avoid angst? If so, how often?",
        disorder: 'ocd'
    },
    {
        id: 25,
        question: "How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?",
        disorder: 'adhd'
    },

]

export default function QuestionTable({ mode }) {

    const [selectedOption, setSelectedOption] = useState('no');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
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
                        <Typography variant="h4" component="h4"
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
                    <TableCell
                        sx={{
                            backgroundColor: mode === 'light' ? medium : deepDark,
                            borderRadius: '0 15px 0 0',
                            border: 'none',
                        }}
                        align="center"
                    >
                        <Typography variant="h3" component="h4"
                            sx={{
                                color: mode === 'light' ? deepDark : richBlack,
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
            <TableBody

            >
                {questions.map(question => (
                    <TableRow key={question.id}>
                        <TableCell
                            sx={{
                                color: mode === 'light' ? deepDark : light,
                                border: 'none',
                                boxShadow: 'none',
                                borderRadius: 'none',
                                width: '50rem',
                            }}
                            component="th" scope="row">
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography variant="h4" component="h4"
                                    sx={{
                                        color: mode === 'light' ? deepDark : light,
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
                                <Typography variant="h4" component="h5"
                                    sx={{
                                        color: mode === 'light' ? deepDark : light,
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
                                row aria-label={question.id} name={question.id} value={selectedOption[question.id]} onChange={(e) => handleOptionChange(question.id, e.target.value)}>
                                <Tooltip title="Not at all" placement="top">
                                    <FormControlLabel value={0} control={<Radio color='primary' />} />
                                </Tooltip>
                                <Tooltip title="Some of the days" placement="top">
                                    <FormControlLabel value={1} control={<Radio color='primary' />} />
                                </Tooltip>
                                <Tooltip title="Most of the days" placement="top">
                                    <FormControlLabel value={2} control={<Radio color='primary' />} />
                                </Tooltip>
                                <Tooltip title="Nearly every day" placement="top">
                                    <FormControlLabel value={3} control={<Radio color='primary' />} />
                                </Tooltip>
                            </RadioGroup>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

