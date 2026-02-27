import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronRight,
    ChevronLeft,
    Dna,
    Droplets,
    Zap,
    ShieldCheck,
    Wind,
    Sun,
    Building,
    CheckCircle2,
    ArrowRight,
    Sparkles,
    RefreshCw,
    Activity,
    Target
} from 'lucide-react';
import OptimizedImage from '../components/OptimizedImage';

interface Question {
    id: number;
    title: string;
    subtitle: string;
    options: Option[];
}

interface Option {
    id: string;
    label: string;
    description: string;
    icon: React.ReactNode;
    weight: Record<string, number>;
}

const QUESTIONS: Question[] = [
    {
        id: 1,
        title: "How does your skin feel in its natural state?",
        subtitle: "Identify the baseline behavior of your dermal barrier.",
        options: [
            {
                id: "dry",
                label: "Lacks Lipid Content",
                description: "Tightness, flaking, or persistent dullness.",
                icon: <Droplets className="w-6 h-6" />,
                weight: { avocado: 2, gold: 1 }
            },
            {
                id: "oily",
                label: "Excess Sebum Production",
                description: "Visible pores, shine, or congestion.",
                icon: <Zap className="w-6 h-6" />,
                weight: { gold: 2, avocado: 0 }
            },
            {
                id: "combination",
                label: "Variable Distribution",
                description: "Central shine with lateral dryness.",
                icon: <RefreshCw className="w-6 h-6" />,
                weight: { gold: 1, avocado: 1 }
            },
            {
                id: "sensitive",
                label: "Reactive Response",
                description: "Prone to redness or micro-inflammation.",
                icon: <ShieldCheck className="w-6 h-6" />,
                weight: { avocado: 3, gold: 0 }
            }
        ]
    },
    {
        id: 2,
        title: "What is your primary cellular objective?",
        subtitle: "Select the transformation you wish to prioritize.",
        options: [
            {
                id: "renewal",
                label: "Cellular Renewal",
                description: "Addressing fine lines and loss of firmness.",
                icon: <Dna className="w-6 h-6" />,
                weight: { gold: 3, avocado: 0 }
            },
            {
                id: "hydration",
                label: "Deep Hydration",
                description: "Restoring plumpness and moisture integrity.",
                icon: <Droplets className="w-6 h-6" />,
                weight: { avocado: 3, gold: 0 }
            },
            {
                id: "radiance",
                label: "Luminosity Activation",
                description: "Eliminating fatigue and uneven tone.",
                icon: <Sparkles className="w-6 h-6" />,
                weight: { gold: 3, avocado: 1 }
            },
            {
                id: "barrier",
                label: "Barrier Reinforcement",
                description: "Strengthening defensive skin layers.",
                icon: <ShieldCheck className="w-6 h-6" />,
                weight: { avocado: 2, gold: 1 }
            }
        ]
    },
    {
        id: 3,
        title: "Detail your external environment?",
        subtitle: "Environmental stressors impact dermal resilience.",
        options: [
            {
                id: "urban",
                label: "Metropolitan",
                description: "Exposure to pollutants and oxidative stress.",
                icon: <Zap className="w-6 h-6" />,
                weight: { gold: 2, avocado: 1 }
            },
            {
                id: "dry",
                label: "Arid / Controlled",
                description: "Low humidity or constant HVAC exposure.",
                icon: <Wind className="w-6 h-6" />,
                weight: { avocado: 3, gold: 0 }
            },
            {
                id: "sunny",
                label: "High UV Density",
                description: "Consistent solar exposure and heat.",
                icon: <Sun className="w-6 h-6" />,
                weight: { avocado: 1, gold: 2 }
            }
        ]
    }
];

const Diagnostic: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<'gold' | 'avocado' | null>(null);

    const handleOptionSelect = (optionId: string) => {
        const newAnswers = [...answers];
        newAnswers[currentStep] = optionId;
        setAnswers(newAnswers);

        if (currentStep < QUESTIONS.length - 1) {
            setTimeout(() => setCurrentStep(prev => prev + 1), 250);
        } else {
            calculateResult(newAnswers);
        }
    };

    const calculateResult = (finalAnswers: string[]) => {
        setIsAnalyzing(true);

        let goldWeight = 0;
        let avocadoWeight = 0;

        finalAnswers.forEach((ansId, idx) => {
            const option = QUESTIONS[idx].options.find(o => o.id === ansId);
            if (option) {
                goldWeight += option.weight.gold || 0;
                avocadoWeight += option.weight.avocado || 0;
            }
        });

        setTimeout(() => {
            // Clear decisive result between one or the other
            setResult(goldWeight >= avocadoWeight ? 'gold' : 'avocado');
            setIsAnalyzing(false);
            setCurrentStep(QUESTIONS.length);
        }, 1800);
    };

    const reset = () => {
        setCurrentStep(0);
        setAnswers([]);
        setResult(null);
    };

    const CHECKOUT_VARIANTS: Record<'gold' | 'avocado', string> = {
        gold:    '42441499410475',
        avocado: '42494908629035',
    };

    const handleViewProtocol = (quizResult: 'gold' | 'avocado') => {
        const variantId = CHECKOUT_VARIANTS[quizResult];
        const storeDomain = 'r6duap-tx.myshopify.com';
        const returnTo = encodeURIComponent(window.location.origin);
        window.location.href = `https://${storeDomain}/cart/${variantId}:1?return_to=${returnTo}`;
    };

    const progress = (currentStep / (QUESTIONS.length)) * 100;

    return (
        <div className="min-h-screen bg-aphoria-bg pt-24 pb-12 px-6 flex flex-col items-center justify-center overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-aphoria-gold/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-aphoria-green/10 rounded-full blur-[120px]" />
            </div>

            {/* Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1.5 bg-aphoria-black/5 z-[60]">
                <motion.div
                    className="h-full bg-aphoria-gold"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                />
            </div>

            <div className="max-w-5xl w-full relative z-10">
                <AnimatePresence mode="wait">
                    {currentStep < QUESTIONS.length ? (
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="space-y-12"
                        >
                            <div className="text-center space-y-4">
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="inline-block text-[10px] uppercase tracking-[0.4em] text-aphoria-gold font-bold px-4 py-1.5 border border-aphoria-gold/20 rounded-full"
                                >
                                    Clinical Diagnostic Phase 0{currentStep + 1}
                                </motion.span>
                                <h2 className="text-[32px] md:text-[52px] font-brand font-light text-aphoria-black leading-tight italic">
                                    {QUESTIONS[currentStep].title}
                                </h2>
                                <p className="text-[14px] md:text-[16px] text-aphoria-mid tracking-wide max-w-lg mx-auto font-light">
                                    {QUESTIONS[currentStep].subtitle}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                                {QUESTIONS[currentStep].options.map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => handleOptionSelect(option.id)}
                                        className={`group text-left p-8 rounded-[32px] border transition-all duration-500 relative overflow-hidden flex gap-6 items-center
                      ${answers[currentStep] === option.id
                                                ? 'border-aphoria-gold bg-white shadow-2xl scale-[1.02]'
                                                : 'border-aphoria-black/5 bg-white/40 hover:bg-white hover:border-aphoria-black/10 hover:shadow-xl'}`}
                                    >
                                        <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500
                      ${answers[currentStep] === option.id ? 'bg-aphoria-gold text-white shadow-lg' : 'bg-aphoria-gold/5 text-aphoria-gold group-hover:scale-110'}`}>
                                            {option.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-[17px] font-bold text-aphoria-black mb-1 italic tracking-tight">{option.label}</h3>
                                            <p className="text-[13px] text-aphoria-mid leading-relaxed font-light">{option.description}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {currentStep > 0 && (
                                <div className="flex justify-center pt-8">
                                    <button
                                        onClick={() => setCurrentStep(prev => prev - 1)}
                                        className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-aphoria-mid hover:text-aphoria-black transition-colors"
                                    >
                                        <ChevronLeft size={14} /> Back to previous phase
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    ) : isAnalyzing ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20 space-y-12"
                        >
                            <div className="relative w-40 h-40 mx-auto">
                                <motion.div
                                    className="absolute inset-0 border border-aphoria-gold/20 rounded-full"
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                <motion.div
                                    className="absolute inset-0 border-2 border-aphoria-gold rounded-full border-t-transparent border-b-transparent"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center text-aphoria-gold">
                                    <Activity size={48} className="animate-pulse" />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <h2 className="text-[28px] font-brand font-light text-aphoria-black italic">Targeting Dermal Protocol...</h2>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-[48px] border border-aphoria-black/5 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.08)]"
                        >
                            <div className="grid lg:grid-cols-[1.2fr_1fr]">
                                <div className="p-12 lg:p-20 flex flex-col justify-center space-y-10">
                                    <div className="space-y-4">
                                        <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.4em] text-aphoria-gold font-bold">
                                            <Target size={14} /> Clinical Recommendation
                                        </span>
                                        <h2 className="text-[42px] md:text-[56px] font-brand font-light text-aphoria-black leading-[1.05] tracking-tight">
                                            {result === 'gold'
                                                ? <>Your skin requires <span className="italic">Radiance Activation.</span></>
                                                : <>Your skin requires <span className="italic">Barrier Integration.</span></>
                                            }
                                        </h2>
                                    </div>

                                    <div className="space-y-6">
                                        <p className="text-[17px] text-aphoria-mid leading-relaxed font-light">
                                            {result === 'gold'
                                                ? 'The 24K Gold Protocol is indicated for luminosity activation, cellular renewal, and visible firming. Restoring radiance at the structural level.'
                                                : 'The Avocado Protocol is indicated for cellular rehydration and lipid barrier replenishment. Calming reactive responses at the source.'
                                            }
                                        </p>

                                        <div className="pt-8 border-t border-aphoria-black/10">
                                            <div className="grid grid-cols-2 gap-5">
                                                <div className="bg-aphoria-bg/40 p-5 rounded-[24px] border border-aphoria-black/5 flex flex-col gap-1">
                                                    <div className="text-[20px] font-bold text-aphoria-black">
                                                        {result === 'gold' ? '98%' : '94%+'}
                                                    </div>
                                                    <div className="text-[10px] uppercase tracking-wider text-aphoria-mid font-semibold">
                                                        {result === 'gold' ? 'Instant Lift' : 'Satisfaction'}
                                                    </div>
                                                </div>
                                                <div className="bg-aphoria-bg/40 p-5 rounded-[24px] border border-aphoria-black/5 flex flex-col gap-1">
                                                    <div className="text-[20px] font-bold text-aphoria-black">28 Days</div>
                                                    <div className="text-[10px] uppercase tracking-wider text-aphoria-mid font-semibold">Cycle Results</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                        <button
                                            onClick={() => handleViewProtocol(result!)}
                                            className="flex-1 inline-flex items-center justify-center gap-2.5 bg-aphoria-black text-white px-7 py-3.5 rounded-full text-[11px] uppercase tracking-[0.22em] font-semibold hover:bg-aphoria-green transition-all duration-500 active:scale-95"
                                        >
                                            View Protocol <ArrowRight size={14} />
                                        </button>
                                        <button
                                            onClick={reset}
                                            className="inline-flex items-center justify-center px-6 py-3.5 rounded-full border border-aphoria-black/12 text-[10px] uppercase tracking-[0.22em] font-semibold text-aphoria-mid hover:text-aphoria-black hover:border-aphoria-black/25 transition-all duration-300"
                                        >
                                            Retake
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-white relative h-[500px] lg:h-auto overflow-hidden flex items-center justify-center">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={result}
                                            initial={{ opacity: 0, scale: 1.06 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                                            className="absolute inset-0 flex items-center justify-center p-8"
                                        >
                                            <img
                                                src={result === 'gold'
                                                    ? '/goldmask-landing/producto/goldmask-original.png'
                                                    : '/avocado-landing/producto/avocado-original.png'}
                                                className="w-full h-full object-contain"
                                                alt={result === 'gold' ? '24 Gold Mask' : 'Avocado Mask'}
                                                loading="eager"
                                                decoding="async"
                                            />
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Diagnostic;
