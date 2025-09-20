import React, { useState, useRef } from 'react';
import { Mic, MicOff, Code, Zap, Download, Copy, CheckCircle, Volume2, Activity } from 'lucide-react';
import Logo from './components/Logo';

  // Demo examples with pre-written responses
const demoExamples = [
    {
      transcript: "Create a React component for a user login form with email and password fields",
      language: "javascript",
      code: `import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Login logic here
      console.log('Login attempt:', { email, password });
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;`
    },
    {
      transcript: "Write a Python function to calculate fibonacci numbers recursively",
      language: "python",
      code: `def fibonacci(n):
    """
    Calculate the nth Fibonacci number using recursion.
    
    Args:
        n (int): The position in the Fibonacci sequence
        
    Returns:
        int: The nth Fibonacci number
        
    Raises:
        ValueError: If n is negative
    """
    if n < 0:
        raise ValueError("Fibonacci sequence is not defined for negative numbers")
    elif n == 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fibonacci(n - 1) + fibonacci(n - 2)

def fibonacci_optimized(n, memo={}):
    """
    Optimized version using memoization to avoid redundant calculations.
    """
    if n in memo:
        return memo[n]
    
    if n < 0:
        raise ValueError("Fibonacci sequence is not defined for negative numbers")
    elif n <= 1:
        return n
    else:
        memo[n] = fibonacci_optimized(n - 1, memo) + fibonacci_optimized(n - 2, memo)
        return memo[n]

# Example usage
if __name__ == "__main__":
    # Calculate first 10 Fibonacci numbers
    for i in range(10):
        print(f"F({i}) = {fibonacci_optimized(i)}")
        
    # Calculate larger Fibonacci number efficiently
    print(f"F(50) = {fibonacci_optimized(50)}")`
    },
    {
      transcript: "Create a CSS flexbox layout for a responsive navigation bar",
      language: "css",
      code: `/* Responsive Navigation Bar with Flexbox */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.navbar-brand:hover {
  transform: scale(1.05);
}

.navbar-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
}

.navbar-item {
  position: relative;
}

.navbar-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.navbar-link:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.navbar-link.active {
  background: rgba(255, 255, 255, 0.2);
  border-bottom: 2px solid #ffd700;
}

.navbar-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 4px;
}

.navbar-toggle span {
  width: 25px;
  height: 3px;
  background: white;
  transition: 0.3s;
  border-radius: 3px;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .navbar-menu {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: inherit;
    padding: 1rem 0;
    gap: 0;
  }
  
  .navbar-menu.active {
    display: flex;
  }
  
  .navbar-toggle {
    display: flex;
  }
  
  .navbar-link {
    padding: 1rem 2rem;
    border-radius: 0;
  }
}`
    }
  ];

const languages = [
    { value: 'javascript', label: 'JavaScript', icon: '🟨' },
    { value: 'python', label: 'Python', icon: '🐍' },
    { value: 'java', label: 'Java', icon: '☕' },
    { value: 'cpp', label: 'C++', icon: '⚡' },
    { value: 'html', label: 'HTML', icon: '🌐' },
    { value: 'css', label: 'CSS', icon: '🎨' }
  ];

const VerbalizeDemo = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [audioLevel, setAudioLevel] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);
  const [currentExample, setCurrentExample] = useState(0);

    const animationFrameRef = useRef(null);

  // eslint-disable-next-line
  const startRecording = async () => {
    // eslint-disable-next-line
    try {
      // eslint-disable-next-line
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsRecording(true);
      
      // Simulate audio level animation
      const animateAudioLevel = () => {
        setAudioLevel(Math.random() * 0.8 + 0.2);
        if (isRecording) {
          animationFrameRef.current = requestAnimationFrame(animateAudioLevel);
        }
      };
      animateAudioLevel();
      
      // Auto-stop after 3 seconds for demo
      setTimeout(() => {
        stopRecording();
      }, 3000);
      
    } catch (error) {
      alert('Microphone access required for demo. Click OK to see sample results.');
      // Show demo results immediately if mic access denied
      simulateProcessing();
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    setAudioLevel(0);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    simulateProcessing();
  };

  const simulateProcessing = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      const example = demoExamples[currentExample];
      setTranscript(example.transcript);
      setLanguage(example.language);
      
      // Simulate typing effect for code generation
      let index = 0;
      const typeCode = () => {
        if (index < example.code.length) {
          setGeneratedCode(example.code.substring(0, index + 1));
          index += Math.floor(Math.random() * 3) + 1; // Variable typing speed
          setTimeout(typeCode, 20);
        } else {
          setIsProcessing(false);
        }
      };
      
      setTimeout(typeCode, 500);
      setCurrentExample((prev) => (prev + 1) % demoExamples.length);
    }, 2000);
  };

  const tryExample = (exampleIndex) => {
    const example = demoExamples[exampleIndex];
    setTranscript(example.transcript);
    setLanguage(example.language);
    setGeneratedCode(example.code);
    setCurrentExample(exampleIndex);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (err) {
      console.error('Failed to copy text');
    }
  };

  const downloadCode = () => {
    const extensions = {
      javascript: 'js',
      python: 'py',
      java: 'java',
      cpp: 'cpp',
      html: 'html',
      css: 'css'
    };
    
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `verbalize_output.${extensions[language] || 'txt'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Header */}
      <div className="border-b border-gray-700 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg"></div>
                  <Logo />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">VERBALIZE</h1>
                <p className="text-sm text-gray-300">Voice-to-Code AI Generator</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full border border-green-500">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-300">Google Gemini AI</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recording Panel */}
          <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Mic className="w-5 h-5 text-blue-400" />
                Voice Input
              </h2>
              <p className="text-gray-300 text-sm mt-1">Speak your code requirements naturally</p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Language Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Target Language</label>
                <select 
                  value={language} 
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isRecording || isProcessing}
                >
                  {languages.map(lang => (
                    <option key={lang.value} value={lang.value}>
                      {lang.icon} {lang.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Recording Controls */}
              <div className="text-center space-y-4">
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isProcessing}
                  className={`w-32 h-32 rounded-full border-4 transition-all duration-300 flex items-center justify-center ${
                    isRecording 
                      ? 'bg-red-500 border-red-400 animate-pulse' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 border-blue-400 hover:scale-105'
                  } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isRecording ? (
                    <MicOff className="w-12 h-12 text-white" />
                  ) : (
                    <Mic className="w-12 h-12 text-white" />
                  )}
                </button>
                
                <div>
                  <p className="text-white font-semibold">
                    {isProcessing ? 'Processing...' : isRecording ? 'Listening...' : 'Click to Start Recording'}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {isRecording && 'Speak clearly and describe what you want to build'}
                  </p>
                </div>

                {/* Audio Visualizer */}
                {isRecording && (
                  <div className="flex items-center justify-center gap-1 h-16">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full transition-all duration-100"
                        style={{
                          height: `${Math.max(8, audioLevel * 100 * (0.5 + Math.random() * 0.5))}%`
                        }}
                      />
                    ))}
                  </div>
                )}

                {isProcessing && (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full"></div>
                    <span className="text-gray-300">AI is generating your code...</span>
                  </div>
                )}
              </div>

              {/* Quick Examples */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-300">Try These Examples:</h3>
                {demoExamples.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => tryExample(index)}
                    className="w-full text-left p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-gray-600 transition-colors"
                    disabled={isRecording || isProcessing}
                  >
                    <div className="text-sm text-gray-300 italic">"{example.transcript.substring(0, 60)}..."</div>
                    <div className="text-xs text-gray-500 mt-1">{languages.find(l => l.value === example.language)?.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Code Output Panel */}
          <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Code className="w-5 h-5 text-green-400" />
                  Generated Code
                </h2>
                {generatedCode && (
                  <div className="flex gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1 transition-colors"
                    >
                      {copiedCode ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copiedCode ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={downloadCode}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-6">
              {!transcript && !generatedCode ? (
                <div className="text-center py-12">
                  <Code className="w-16 h-16 mx-auto text-gray-500 mb-4" />
                  <p className="text-gray-400">Start recording to see AI-generated code appear here</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Transcript */}
                  {transcript && (
                    <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-700">
                      <h3 className="text-blue-300 font-semibold mb-2">What you said:</h3>
                      <p className="text-gray-300 italic">"{transcript}"</p>
                    </div>
                  )}

                  {/* Generated Code */}
                  {generatedCode && (
                    <div className="bg-gray-900 rounded-lg border border-gray-600 overflow-hidden">
                      <div className="bg-gray-800 px-4 py-2 border-b border-gray-600">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 text-sm font-medium">
                            {languages.find(l => l.value === language)?.icon} {languages.find(l => l.value === language)?.label}
                          </span>
                          <div className="flex gap-1">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 overflow-x-auto">
                        <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap">
                          {generatedCode}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-8 border border-blue-500/30">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Why Verbalize?</h3>
            <p className="text-gray-300">Transform your voice into production-ready code instantly</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-500/20 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="w-8 h-8 text-blue-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Lightning Fast</h4>
              <p className="text-gray-300 text-sm">Generate code 10x faster than typing. Just speak your requirements naturally.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-500/20 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Code className="w-8 h-8 text-purple-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Multi-Language</h4>
              <p className="text-gray-300 text-sm">Supports JavaScript, Python, Java, C++, HTML, CSS and more programming languages.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-500/20 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Activity className="w-8 h-8 text-green-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Natural Speech</h4>
              <p className="text-gray-300 text-sm">Powered by Google Speech-to-Text and Gemini AI for accurate understanding.</p>
            </div>
          </div>
        </div>

        {/* Demo Notice */}
        <div className="mt-8 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-6 border border-purple-500">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-purple-500 p-2 rounded-lg">
              <Volume2 className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white">This is a Demo</h3>
          </div>
          <p className="text-gray-300 mb-4">
            Verbalize uses Google Cloud Speech-to-Text and Gemini AI to convert natural language into production-ready code. 
            The full version includes advanced code optimization, error handling, and integration with popular IDEs.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-600/30 text-blue-200 rounded-full text-sm">Google Cloud Speech</span>
            <span className="px-3 py-1 bg-purple-600/30 text-purple-200 rounded-full text-sm">Gemini AI</span>
            <span className="px-3 py-1 bg-green-600/30 text-green-200 rounded-full text-sm">Multi-Language</span>
            <span className="px-3 py-1 bg-yellow-600/30 text-yellow-200 rounded-full text-sm">Real-time Processing</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerbalizeDemo;