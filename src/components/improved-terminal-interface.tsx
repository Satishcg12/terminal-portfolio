"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type CommandEntry = {
  id: number;
  command: string;
  result: string;
};

const COMMANDS = [
  { name: "/about", description: "Learn about me" },
  { name: "/contact", description: "Get my contact information" },
  { name: "/projects", description: "View my projects" },
  { name: "/portfolio", description: "See my portfolio" },
  { name: "/clear", description: "Clear the terminal" },
  { name: "/help", description: "Show this help message" },
];

export function ImprovedTerminalInterfaceComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<CommandEntry[]>([]);
  const [currentStreamingEntry, setCurrentStreamingEntry] =
    useState<CommandEntry | null>(null);
  const [streamedText, setStreamedText] = useState("");
  const [entryId, setEntryId] = useState(0);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [filteredCommands, setFilteredCommands] = useState(COMMANDS);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [commandHistory, streamedText]);

  useEffect(() => {
    if (currentStreamingEntry) {
      let index = 0;
      const intervalId = setInterval(() => {
        if (index < currentStreamingEntry.result.length) {
          setStreamedText((prev) => prev + currentStreamingEntry.result[index]);
          index++;
        } else {
          clearInterval(intervalId);
          setCommandHistory((prev) => [
            ...prev,
            { ...currentStreamingEntry, result: currentStreamingEntry.result },
          ]);
          setCurrentStreamingEntry(null);
          setStreamedText("");
        }
      }, 30);

      return () => clearInterval(intervalId);
    }
  }, [currentStreamingEntry]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    if (value.startsWith("/")) {
      setShowAutocomplete(true);
      setFilteredCommands(COMMANDS.filter((cmd) => cmd.name.startsWith(value)));
    } else {
      setShowAutocomplete(false);
    }
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry = {
      id: entryId,
      command: input,
      result: processCommand(input),
    };
    setEntryId(entryId + 1);
    setCurrentStreamingEntry(newEntry);
    setInput("");
    setShowAutocomplete(false);
  };

  const handleAutocomplete = (command: string) => {
    setInput(command);
    setShowAutocomplete(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const ASCCIART =
    "##########################################################\n#__        __   _                       _                #\n#\\ \\      / /__| | ___ ___  _ __ ___   | |_ ___          #\n# \\ \\ /\\ / / _ \\ |/ __/ _ \\| '_ ` _ \\  | __/ _ \\         #\n#  \\ V  V /  __/ | (_| (_) | | | | | | | || (_) |        #\n# __\\_/\\_/ \\___|_|\\___\\___/|_| |_| |_|__\\__\\___/ _       #\n#|  \\/  |_   _  |  _ \\ ___  _ __| |_ / _| ___ | (_) ___  #\n#| |\\/| | | | | | |_) / _ \\| '__| __| |_ / _ \\| | |/ _ \\ #\n#| |  | | |_| | |  __/ (_) | |  | |_|  _| (_) | | | (_) |#\n#|_|  |_|\\__, | |_|   \\___/|_|   \\__|_|  \\___/|_|_|\\___/ #\n#        |___/                                           #\n##########################################################";

  const processCommand = (command: string): string => {
    switch (command.toLowerCase()) {
      case "/about":
        return "I'm a terminal-style portfolio interface showcasing my skills and projects.";
      case "/contact":
        return "Email: example@email.com\nPhone: (123) 456-7890\nLinkedIn: linkedin.com/in/example";
      case "/help":
      case "/?":
        return COMMANDS.map((cmd) => `${cmd.name} - ${cmd.description}`).join(
          "\n"
        );
      case "/projects":
        return "1. Project A - A web application built with React and Node.js\n2. Project B - An iOS app developed using Swift\n3. Project C - A machine learning model for image classification";
      case "/portfolio":
        return "Visit https://example.com/portfolio to see my full portfolio of work and achievements.";
      case "/clear":
        setCommandHistory([]);
        return "Terminal cleared.";
      default:
        return `Command "${command}" not recognized. Type /help for a list of available commands.`;
    }
  };

  return (
    <div className="h-screen w-screen bg-zinc-900 text-white font-mono flex flex-col">
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full flex items-center justify-center bg-zinc-800 absolute top-0 left-0"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-[600px] h-[400px] bg-zinc-800 p-10 shadow-lg"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-zinc-400 text-sm mb-4"
              >
                SELECTED WORKS
                <br />
                2021/2030
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-white text-6xl font-bold mb-8"
              >
                Portfolio
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="text-zinc-400 text-sm mb-4"
              >
                SATISH CHAUDHARY
              </motion.div>

              <div className="flex justify-between text-zinc-500 text-xs">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  className="hover:text-white transition-colors duration-300"
                >
                  <p>A</p>
                  <p>Address: kathmandu nepal</p>
                  <p>State, Country 12345</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                  className="hover:text-white transition-colors duration-300"
                >
                  <p>W/P</p>
                  <p>Web: www.example.com</p>
                  <p>Phone: +00 123 456 7890</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}

        <motion.div key="terminal" className="h-full w-full flex flex-col">
          <div ref={outputRef} className="flex-grow overflow-y-auto">
            <div className="p-4 bg-zinc-800">
              <pre className="text-green-400 font-semibold">{ASCCIART}</pre>
              <br />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p>
                    <span className="text-green-500 font-bold ">OS:</span> React
                    OS
                  </p>
                  <p>
                    <span className="text-green-500 font-bold">Host:</span>{" "}
                    v0.dev
                  </p>
                  <p>
                    <span className="text-green-500 font-bold">Kernel:</span>{" "}
                    1.0.0
                  </p>
                  <p>
                    <span className="text-green-500 font-bold">Uptime:</span>{" "}
                    1d 2h 30m
                  </p>
                </div>
                <div>
                  <p>
                    <span className="text-green-500 font-bold">Shell:</span>{" "}
                    React Shell
                  </p>
                  <p>
                    <span className="text-green-500 font-bold">
                      Resolution:
                    </span>{" "}
                    1920x1080
                  </p>
                  <p>
                    <span className="text-green-500 font-bold">DE:</span>{" "}
                    Next.js
                  </p>
                  <p>
                    <span className="text-green-500 font-bold">WM:</span> Vercel
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p className="font-bold text-green-400">Available Commands:</p>
                <ul className="list-disc list-inside">
                  {COMMANDS.map((cmd, index) => (
                    <li key={index}>
                      {cmd.name} - {cmd.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="p-4 space-y-2">
              <p>
                Welcome to the terminal. Type "/help" for a list of commands.
              </p>
              <AnimatePresence>
                {commandHistory.map((entry) => (
                  <div key={entry.id} className="bg-zinc-800 p-2 rounded">
                    <p className="text-green-500">$ {entry.command}</p>
                    <p className="whitespace-pre-wrap">{entry.result}</p>
                  </div>
                ))}
                {currentStreamingEntry && (
                  <motion.div
                    key="streaming"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-zinc-800 p-2 rounded"
                  >
                    <p className="text-green-500">
                      $ {currentStreamingEntry.command}
                    </p>
                    <p className="whitespace-pre-wrap">{streamedText}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <form
            onSubmit={handleInputSubmit}
            className="p-4 bg-zinc-800 flex flex-col"
          >
            <div className="flex items-center">
              <span className="mr-2 text-green-500">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                className="flex-grow bg-transparent outline-none"
              />
              <span className="animate-blink ml-1">▋</span>
            </div>
            {showAutocomplete && (
              <ul className="mt-2 bg-zinc-700 rounded">
                {filteredCommands.map((cmd, index) => (
                  <li
                    key={index}
                    className="px-2 py-1 hover:bg-zinc-600 cursor-pointer"
                    onClick={() => handleAutocomplete(cmd.name)}
                  >
                    {cmd.name}
                  </li>
                ))}
              </ul>
            )}
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
