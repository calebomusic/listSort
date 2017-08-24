/**

{
    reps: {
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
        console.log('sort')
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
            <ul>
                <SortButton
                    name="Rep"
                    sortAsc={() => this.props.sort((a, b) => { 
                        return a.name.charCodeAt(0) - b.name.charCodeAt(0)
                    })}
                    sortDesc={() => this.props.sort((a, b) => { 
                        return b.name.charCodeAt(0) - a.name.charCodeAt(0)
                    })}
                />
                <SortButton
                    name="Team"
                    sortAsc={() => this.props.sort((a, b) => { 
                        return a.team.charCodeAt(0) - b.name.charCodeAt(0)
                    })}
                    sortDesc={() => this.props.sort((a, b) => { 
                        return b.team.charCodeAt(0) - a.name.charCodeAt(0)
                    })}
                />
                <SortButton
                    name="Review"
                    sortAsc={() => this.props.sort((a, b) => { 
                        return a.review.charCodeAt(0) - b.review.charCodeAt(0)
                    })}
                    sortDesc={() => this.props.sort((a, b) => { 
                        return b.review.charCodeAt(0) - a.review.charCodeAt(0)
                    })}
                />
                <SortButton
                    name="1-Week-Change"
                    sortAsc={() => this.props.sort((a, b) => { 
                        return a.change - b.change
                    })}
                    sortDesc={() => this.props.sort((a, b) => { 
                        return b.change - a.change
                    })}
                />
                <SortButton
                    name="Probing Questions"
                    sortAsc={() => this.props.sort((a, b) => { 
                        return a.skills.coreSkills.probingQuestions - b.skills.coreSkills.probingQuestions
                    })}
                    sortDesc={() => this.props.sort((a, b) => { 
                        return b.skills.coreSkills.probingQuestions - a.skills.coreSkills.probingQuestions
                    })}
                />
                <SortButton
                    name="Benefits"
                    sortAsc={() => this.props.sort((a, b) => { 
                        return a.skills.coreSkills.benefits - b.skills.coreSkills.benefits
                    })}
                    sortDesc={() => this.props.sort((a, b) => { 
                        return b.skills.coreSkills.benefits - a.skills.coreSkills.benefits
                    })}
                />
                <SortButton
                    name="CloseAttempts"
                    sortAsc={() => this.props.sort((a, b) => { 
                        return a.skills.coreSkills.closeAttempts - b.skills.coreSkills.closeAttempts
                    })}
                    sortDesc={() => this.props.sort((a, b) => { 
                        return b.skills.coreSkills.closeAttempts - a.skills.coreSkills.closeAttempts
                    })}
                />
                <SortButton
                    name="UpsellAttempts"
                    sortAsc={() => this.props.sort((a, b) => { 
                        return a.skills.coreSkills.upsellAttempts - b.skills.coreSkills.upsellAttempts
                    })}
                    sortDesc={() => this.props.sort((a, b) => { 
                        return b.skills.coreSkills.upsellAttempts - a.skills.coreSkills.upsellAttempts
                    })}
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
            <li onClick={this.onClick.bind(this)}>
                {this.props.name}
            </li>
        );
    }
}

class Row extends Component {
    render () {
        const {name, team, review, change, skills} = this.props.rep
        const coreSkills = skills.coreSkills;

        return (
            <ul>
                <li>
                    {name}
                </li>
                <li>
                    {team}
                </li>
                <li>
                    {review}
                </li>
                <li>
                    {change}
                </li>
                <li>
                    {coreSkills.probingQuestions}
                </li>
                <li>
                    {coreSkills.benefits}
                </li>
                <li>
                    {coreSkills.closeAttempts}
                </li>
                <li>
                    {coreSkills.upsellAttempts}
                </li>
            </ul>
        );
    }
}