'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';
import Link from 'next/link';

declare global {
    interface Skill {
        id: string;
        display: string;
        skill: string;
        type: number;
        generation: number | undefined;
        position: { x: number; y: number } | undefined;
    }
}

export default function Skills() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [nodes, setNodes] = useState<any[]>([]);
    const [edges, setEdges] = useState<any[]>([]);
    const graphSize = 1600;
    const generationDistance = 500;
  
    useEffect(() => {
        axios({
            method: 'get',
            url: process.env.API_ENDPOINT+'skills',
            withCredentials: true,
        })
        .then((response) => {
            console.log(response.data);
            setSkills(response.data);
        })
        .catch((error) => {
            console.error(error);
        })
    }, []);

    const generatePositions = (skills: Skill[]) => {
        //generation 0: skills that have the skill field set to null
        //generation 1: skills that have the skill field set to a skill in generation 0
        //generation 2: skills that have the skill field set to a skill in generation 1
        //etc.
        //generation 0 skills are placed at the bottom of the graph
        //generation 1 skills are placed above generation 0 skills
        //generation 2 skills are placed above generation 1 skills
        //etc.
        //skills with the same generation are placed next to each other
        //skills with the same generation and the same skill are placed close to each other
        const gen0Skills = skills.filter((skill) => !skill.skill);
        gen0Skills.forEach((skill) => {
            skill.generation = 0;
            skill.position = { x: distributeInSpace(gen0Skills.indexOf(skill), gen0Skills.length, graphSize), y: graphSize };
        });
        return setSkillGeneration(gen0Skills, skills, 0);
    }

    const setSkillGeneration: any = (previousGenerationSkills: Skill[], skills: Skill[], previousGeneration: number) => {
        const currentGeneration = previousGeneration + 1;
        var currentGenerationSkills = skills.filter((skill) => skill.generation === undefined && previousGenerationSkills.some((previousGenerationSkill) => previousGenerationSkill.id === skill.skill));
        if (currentGenerationSkills.length === 0) {
            return previousGenerationSkills;
        }
        currentGenerationSkills = sortSkillsCloserToParents(currentGenerationSkills, previousGenerationSkills);
        currentGenerationSkills.forEach((skill) => {
            skill.generation = currentGeneration;
            skill.position = { x: distributeInSpace(currentGenerationSkills.indexOf(skill), currentGenerationSkills.length, graphSize), y: graphSize - currentGeneration * generationDistance };
        });
        return previousGenerationSkills.concat(setSkillGeneration(currentGenerationSkills, skills, currentGeneration));
    }

    const sortSkillsCloserToParents = (skills: Skill[], parents: Skill[]) => {
        const sortedSkills = skills.sort((skill1, skill2) => {
            const parent1 = parents.find((parent) => parent.id === skill1.skill);
            const parent2 = parents.find((parent) => parent.id === skill2.skill);
            if (parent1 && parent2 && parent1.position && parent2.position) {
                return parent1.position.x - parent2.position.x;
            }
            else {
                return 0;
            }
        });
        return sortedSkills;
    }

    const distributeInSpace = (index: number, count: number, space: number) => {
        const spacePerItem = space / count;
        const itemPosition = spacePerItem * index + spacePerItem / 2;
        return itemPosition;
    }

    const generateNodes = (skills: Skill[]) => {
        const newSkills = generatePositions(skills);
        console.log('newSkills: ', newSkills);
        const nodes = newSkills.map((skill: Skill) => {
            return {
                id: skill.id,
                position: skill.position,
                data: { label: skill.display },
            };
        });
        return nodes;
    }

    const generateEdges = (skills: Skill[]) => {
        const edges = skills.map((skill) => {
            return {
                id: skill.id + '-' + skill.skill,
                source: skill.id,
                target: skill.skill,
            };
        });
        return edges;
    }

    const initialNodes = [
        { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
        { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
    ];
    const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

    useEffect(() => {
        setNodes(generateNodes(skills));
        setEdges(generateEdges(skills));
    }
    , [skills]);

  
    return (
        <div>
            <h1>Skills</h1>
            <Link href="/">[ Home ]</Link>
            <div style={{ width: '100vw', height: '100vh' }}>
                <ReactFlow nodes={nodes} edges={edges} />
            </div>
        </div>
    );
}