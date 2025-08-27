'use client'

import { useEffect, useRef } from 'react'
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'

const PROMPT = '$ '
const MAX_LINES = 20

export default function MinishellDemo() {
    const terminalRef = useRef<HTMLDivElement>(null)
    const termRef = useRef<Terminal | null>(null)

    useEffect(() => {
        if (!terminalRef.current) return

        const term = new Terminal({
            theme: {
                background: '#1a1a1a',
                foreground: '#f0f0f0',
                cursor: '#f472b6',
            },
            fontSize: 14,
            fontFamily: 'monospace',
            rows: 20,
            cols: 90,
            scrollback: 1000,
        })

        term.open(terminalRef.current)
        termRef.current = term

        let commandBuffer = ''
        const commandHistory: string[] = []

        // Disclaimer
        term.writeln('\x1b[1;35m Welcome to the Minishell mini-playground.\x1b[0m')
        term.writeln('\x1b[38;5;105m Note: You are seeing 10% of the work done.\x1b[0m \x1b[38;5;245m This is a simulated shell interface and does  not execute real commands or access your system obviously.\x1b[0m\n')

        term.writeln(getResponse('help')!)

        showPrompt()

        term.onKey(({ key, domEvent }) => {
            const char = key

            if (domEvent.key === 'Enter') {
                term.write('\r\n')
                runCommand(commandBuffer)
                commandHistory.push(commandBuffer)
                commandBuffer = ''
                showPrompt()
            } else if (domEvent.key === 'Backspace') {
                if (commandBuffer.length > 0) {
                    commandBuffer = commandBuffer.slice(0, -1)
                    term.write('\b \b')
                }
            } else if (domEvent.key.length === 1) {
                commandBuffer += char
                term.write(char)
            }
        })

        function runCommand(cmd: string) {
            const response = getResponse(cmd.trim())
            if (response) {
                term.writeln(response)
            } else {
                term.writeln(`minishell: command not found: ${cmd}`)
            }

            // Scroll if too many lines
            if (term.buffer.active.length > MAX_LINES) {
                term.scrollLines(term.buffer.active.length - MAX_LINES)
            }
        }

        function showPrompt() {
            term.write(`\x1b[1;32m${PROMPT}\x1b[0m`)
        }

        function getResponse(command: string): string | null {
            switch (command) {
                case 'help':
                    return ` Available commands:\r\n  - help\r\n  - ls\r\n  - echo hello\r\n  - pwd\r\n  - cd projects\r\n  - export NAME=Yeva\r\n  - echo $NAME\r\n  - echo $?\r\n  - cat < file.txt`;

                case 'ls':
                    return 'minishell  README.md  src/  Makefile';

                case 'echo hello':
                    return 'hello';

                case 'pwd':
                    return '/home/yeva/portfolio/minishell_demo';

                case 'cd projects':
                    return 'Changed directory to projects/';

                case 'export NAME=Yeva':
                    return 'New environment variable set: NAME=Yeva\r\n  SHELL=/bin/zsh\r\n  HOME=/Users/yevahusieva\r\n  USER=yevahusieva\r\n  PATH=/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin\r\n  PWD=/Users/yevahusieva/Documents/42/yhusieva-portfolio/yeva-portfolio\r\n  NAME=Yeva';

                case 'echo $NAME':
                    return 'Yeva';

                case 'echo $?':
                    return '127';

                case 'cat < file.txt':
                    return 'Once upon a shell, there was a prompt that knew love.';

                case 'baby':
                    return 'Love not found. Try again later.';

                case 'clear':
                    term.clear();
                    return (" ");

                case 'exit':
                    term.write('Logging out...\r\n');
                    return (" ");

                default:
                    return null;
            }
        }

        return () => term.dispose()
    }, [])

    return (
        <div className="bg-zinc-900 border-zinc-700 rounded-lg shadow-inner p-2 overflow-hidden text-left">
            <div ref={terminalRef} className="h-80 w-full" />
        </div>
    )
}
