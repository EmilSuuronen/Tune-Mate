import React, { useState, useEffect } from 'react';
import { PitchDetector } from "pitchy";
import "./guitarTuner.css"
import SideNav from "../../components/sidenav/sidenav";
import {useQuery} from "@apollo/client";
import {FIND_TUNING_BY_USER} from "../graphql/tuningTypes";
import Tuning from "../tuning/TuningInterface";

const GuitarTuner: React.FC = () => {
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    const [frequency, setFrequency] = useState<number>(40);
    const [isListening, setIsListening] = useState<boolean>(false);
    const [targetFrequency, setTargetFrequency] = useState<number>(40);
    const [tuningsByUser, setTuningsByUser] = useState<Tuning[]>([]);
    const [formattedTunings, setFormattedTunings] = useState<TuningFormatted[]>([]);
    const userId = localStorage.getItem("currentUser");

    const {loading: loadingTunings, data: tuningsData} = useQuery(FIND_TUNING_BY_USER, {
        variables: {input: {id: userId}}
    });

    useEffect(() => {
        if (tuningsData && tuningsData.findTuningsByOwner) {
            setTuningsByUser(tuningsData.findTuningsByOwner);
            console.log("tunings by user: ", tuningsByUser);
        }
    }, [tuningsData, tuningsByUser]);

    const strings = [
        { name: 'E', freq: 82.41 },
        { name: 'A', freq: 110.00 },
        { name: 'D', freq: 146.83 },
        { name: 'G', freq: 196.00 },
        { name: 'B', freq: 246.94 },
        { name: 'e', freq: 329.63 }
    ];

    type NoteFrequencies = {
        "D#": number;
        "E": number;
        "F": number;
        "F#": number;
        "G": number;
        "G#": number;
        "A": number;
        "A#": number;
        "C": number;
        "C#": number;
        "D": number;
        "B": number;
        "E#": number;
        "e": number;
    };

    interface Tuning {
        name: string;
        string_count: number;
        string_notes: (keyof NoteFrequencies)[];
        owner: string;
    }

    const noteFrequencies: NoteFrequencies = {
        "D#": 155.56,
        "E": 164.81,
        "F": 174.61,
        "F#": 185.00,
        "G": 196.00,
        "G#": 207.65,
        "A": 110.00,
        "A#": 116.54,
        "C": 130.81,
        "C#": 138.59,
        "D": 146.83,
        "B": 246.94,
        "E#": 174.61,
        "e": 329.63
    };

    function mapTuningsToFrequency(tunings: Tuning[]) {
        return tunings.map(tuning => ({
            name: tuning.name,
            strings: tuning.string_notes.map(note => ({
                name: note,
                freq: noteFrequencies[note] || 0 // Safe to access because `note` is a keyof NoteFrequencies
            }))
        }));
    }

    type NoteFrequencyMapping = {
        name: string;
        freq: number;
    };

    type TuningFormatted = {
        name: string;
        strings: NoteFrequencyMapping[];
    };

    useEffect(() => {
        const formatted = mapTuningsToFrequency(tuningsByUser);
        setFormattedTunings(formatted);
        console.log("formattedTunings: ", formattedTunings);
    }, [tuningsByUser]);

    useEffect(() => {
        if (isListening) {
            startListening();
        } else {
            stopListening();
        }

        return () => {
            stopListening();
        };
    }, [isListening]);

    const startListening = () => {
        if (audioContext) return; // Already listening

        const context = new AudioContext();
        setAudioContext(context);
        const analyser = context.createAnalyser();

        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            const source = context.createMediaStreamSource(stream);
            source.connect(analyser);
            analyze(analyser, context);
        });
    };

    const stopListening = () => {
        if (audioContext) {
            audioContext.close();
            setAudioContext(null);
        }
    };

    const analyze = (analyser: AnalyserNode, context: AudioContext) => {
        const buffer = new Float32Array(analyser.frequencyBinCount);
        const detector= PitchDetector.forFloat32Array(1024);
        const update = () => {
            analyser.getFloatTimeDomainData(buffer);
            const [pitch, clarity] = detector.findPitch(buffer, context.sampleRate);
            if (clarity > 0.9) {
                setFrequency(pitch);
            }
            requestAnimationFrame(update);
        };
        update();
    };

    const isCloseToTarget = Math.abs(frequency - targetFrequency) <= 5;

    const handleStringChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFreq = parseFloat(event.target.value);
        setTargetFrequency(selectedFreq);
    };

    const frequencyToPercentage = (freq: number) => {
        return ((freq - 40) / (500 - 40)) * 100;
    };

    const frequencies = [];
    for (let i = 40; i <= 500; i += 20) {
        frequencies.push(i);
    }

    if (loadingTunings) return <p>Loading...</p>;

    return (
        <div className="div-tuner-main">
            <SideNav/>
            <div className="div-tuner-content">
                <h1>Guitar Tuner</h1>
                <p>Select a string and start listening for guitar audio. When the pitch indicators align, tuning is correct. <br/> <b> Browser microphone access is required</b></p>
                <div className="slider-tuner">
                    <div className="slider-marker target" style={{ left: `${frequencyToPercentage(targetFrequency)}%` }} />
                    <div className="slider-marker current" style={{ left: `${frequencyToPercentage(frequency)}%` }} />
                    {frequencies.map(freq => (
                        <div key={freq} className="frequency-mark" style={{ left: `${frequencyToPercentage(freq)}%` }}>
                            <div className="line"></div>
                            <div className="label">{freq} Hz</div>
                        </div>
                    ))}
                </div>
                <select className="selector-guitar-tuner-string" onChange={handleStringChange} value={targetFrequency.toString()}>
                    <option value="40">Ready Tunings</option>
                    <optgroup label="Standard Tuning">
                        {strings.map(string => (
                            <option key={string.name} value={string.freq.toString()}>
                                {string.name} - {string.freq} Hz
                            </option>
                        ))}
                    </optgroup>
                </select>
                <select className="selector-guitar-tuner-string" name="tunings" id="tuning-select" onChange={handleStringChange}>
                    <option value="40">Your tunings</option>
                    {formattedTunings.map(tuning => (
                        <optgroup key={tuning.name} label={tuning.name}>
                            {tuning.strings.map(string => (
                                <option key={`${tuning.name}-${string.name}`} value={string.freq.toString()}>
                                    {string.name} - {string.freq} Hz
                                </option>
                            ))}
                        </optgroup>
                    ))}
                </select>
                <p>Tune Frequency: <span style={{ color: isCloseToTarget ? 'green' : 'red' }}>{frequency.toFixed(2)} Hz</span></p>
                <button className="button-color" onClick={() => setIsListening(!isListening)}>
                    {isListening ? 'Stop Listening' : 'Start Listening'}
                </button>
            </div>
        </div>
    );
};

export default GuitarTuner;
