/**
Assumptions about rep object interface

{
    id: ""
    name: "",
    team: "",
    review: "",
    change: 1,
    skills : {
        coreSkills: {

        },
        custom: {

        }
    }
}
 */

import React, { Component } from 'react';

import './ScoreCardStyles.css';
const REPS = [
    {
        id: 0,
        name: "Ross",
        team: "OutBound",
        review: "Needs Work",
        change: 27,
        skills : {
            coreSkills: {
                probingQuestions: 11,
                benefits: 17,
                closeAttempts: 35,
                upsellAttempts: 45
            },
        }
    },
    {
        id: 1,
        name: "Nate",
        team: "OutBound",
        review: "Needs Work",
        change: -19,
        skills : {
            coreSkills: {
                probingQuestions: 8,
                benefits: 27,
                closeAttempts: 28,
                upsellAttempts: 25
            },
        }
    },
    {
        id: 2,
        name: "Maddy",
        team: "Inbound",
        review: "Needs Work",
        change: 68,
        skills : {
            coreSkills: {
                probingQuestions: 27,
                benefits: 27,
                closeAttempts: 79,
                upsellAttempts: 27
            },
        }
    },
];

export default class ScoreCard extends Component {
    constructor (props) {
        super(props);
        
        this.state = {
            reps: REPS
        };
    }

    sort (cb) {
        const sortedReps = this.state.reps.sort(cb);
        this.setState({ reps: sortedReps });
    }

    renderRepRows () {
        const rows = [];

        this.state.reps.map((rep, i) => {
            rows.push(
                <Row 
                    key={i}
                    rep={rep} />
            );
        });

        return rows;
    }
    render () {
        return(
            <div>
                <TopRow sort={this.sort.bind(this)}/>
                {this.renderRepRows()} 
            </div>
        );
    }
}


class TopRow extends Component {
    render () {
        return (
            <ul className="top-row">
                <SortButton
                    name="Rep"
                    sortAsc={() => this.props.sort((a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0))}
                    sortDesc={() => this.props.sort((a, b) => b.name.charCodeAt(0) - a.name.charCodeAt(0))}
                />
                <SortButton
                    name="Team"
                    sortAsc={() => this.props.sort((a, b) => a.team.charCodeAt(0) - b.name.charCodeAt(0))}
                    sortDesc={() => this.props.sort((a, b) => b.team.charCodeAt(0) - a.name.charCodeAt(0))}
                />
                <SortButton
                    name="Review"
                    sortAsc={() => this.props.sort((a, b) => a.review.charCodeAt(0) - b.review.charCodeAt(0))}
                    sortDesc={() => this.props.sort((a, b) => b.review.charCodeAt(0) - a.review.charCodeAt(0))}
                />
                <SortButton
                    name="1-Week-Change"
                    sortAsc={() => this.props.sort((a, b) => a.change - b.change)}
                    sortDesc={() => this.props.sort((a, b) => b.change - a.change)}
                />
                <SortButton
                    className="skills-top-row"
                    name="Probing Questions"
                    sortAsc={() => this.props.sort((a, b) => a.skills.coreSkills.probingQuestions - b.skills.coreSkills.probingQuestions)}
                    sortDesc={() => this.props.sort((a, b) => b.skills.coreSkills.probingQuestions - a.skills.coreSkills.probingQuestions)}
                />
                <SortButton
                    className="skills-top-row"
                    name="Benefits"
                    sortAsc={() => this.props.sort((a, b) => a.skills.coreSkills.benefits - b.skills.coreSkills.benefits)}
                    sortDesc={() => this.props.sort((a, b) => b.skills.coreSkills.benefits - a.skills.coreSkills.benefits)}
                />
                <SortButton
                    className="skills-top-row"
                    name="CloseAttempts"
                    sortAsc={() => this.props.sort((a, b) => a.skills.coreSkills.closeAttempts - b.skills.coreSkills.closeAttempts)}
                    sortDesc={() => this.props.sort((a, b) => b.skills.coreSkills.closeAttempts - a.skills.coreSkills.closeAttempts)}
                />
                <SortButton
                    className="skills-top-row"
                    name="UpsellAttempts"
                    sortAsc={() => this.props.sort((a, b) => a.skills.coreSkills.upsellAttempts - b.skills.coreSkills.upsellAttempts)}
                    sortDesc={() => this.props.sort((a, b) => b.skills.coreSkills.upsellAttempts - a.skills.coreSkills.upsellAttempts)}
                />
            </ul>
        );
    }
}

class SortButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sort: 0
        };
    }
    
    onClick () {
        if (this.state.sort === 0) {
            this.props.sortDesc();
            this.setState({ sort: 1});
        } else {
            this.props.sortAsc();
            this.setState({ sort: 0 });
        }
    }
    render () {
        return(
            <li 
                className={this.props.className || ""}
                onClick={this.onClick.bind(this)}>
                {this.props.name}
            </li>
        );
    }
}

class Row extends Component {
    declareStyles (review, change, coreSkills) {
        
        if (review === "Needs Work") {
            this.reviewStyle = 'red-snack';    
        } else if (review === "On Track") {
            this.reviewStyle = 'green-snack';
        }

        if (change > 0) {
            this.changeStyle = 'green-snack';
        } else {
            this.changeStyle = 'red-snack';
        }

        for (let skill in coreSkills) {
            let value = coreSkills[skill];
            
            if (value < 25) {
                this[`${skill}Style`] = 'red-box';
            } else if (value < 45) {
                this[`${skill}Style`] = 'redish-box';
            } else if (value < 51) {
                this[`${skill}Style`] = 'neutral-box';
            } else if (value < 60) {
                this[`${skill}Style`] = 'white-box';
            } else if (value < 70) {
                this[`${skill}Style`] = 'greenish-box';
            } else {
                this[`${skill}Style`] = 'green-box';
            }
        }
    }

    render () {
        const {name, team, review, change, skills} = this.props.rep;
        const coreSkills = skills.coreSkills;

        this.declareStyles(review, change, coreSkills);

        return (
            <ul className="row"> 
                <li>
                    <b>{name}</b>
                </li>
                <li className="team">
                    {team}
                </li>
                <li className={this.reviewStyle}>
                    <div>
                        {review}
                    </div>
                </li>
                <li className={this.changeStyle}>
                    <div>
                        {change}%
                    </div>
                </li>
                <li className={this.probingQuestionsStyle}>
                    {coreSkills.probingQuestions}
                </li>
                <li className={this.benefitsStyle}>
                    {coreSkills.benefits}
                </li>
                <li className={this.closeAttemptsStyle}>
                    {coreSkills.closeAttempts}
                </li>
                <li className={this.upsellAttemptsStyle}>
                    {coreSkills.upsellAttempts}
                </li>
            </ul>
        );
    }
}