import React, { useState, useRef, useEffect } from 'react';
import styles from './GlueAnimatedDiagrams.module.css';

interface StepInfo {
  description: string
}

// Redesigned BasicWorkflowDiagram component with mobile-first approach
const BasicWorkflowDiagram: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [animationInterval, setAnimationInterval] = useState<NodeJS.Timeout | null>(null)
  const [hoveredElement, setHoveredElement] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [windowWidth, setWindowWidth] = useState<number>(0)

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    // Set initial width
    setWindowWidth(window.innerWidth)

    // Add resize listener
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const steps: StepInfo[] = [
    { description: "Initial state: Components are connected but no data is flowing yet" },
    { description: "User input is processed by the Researcher model" },
    { description: "The Researcher model uses the Web Search tool to gather information" },
    { description: "The Web Search tool returns results to the Researcher model" },
    { description: "The Researcher model generates the final output based on search results" },
  ]

  const togglePlay = () => {
    if (isPlaying) {
      stopAnimation()
    } else {
      startAnimation()
    }
  }

  const startAnimation = () => {
    setIsPlaying(true)
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          return 0
        }
        return prev + 1
      })
    }, 3000)
    setAnimationInterval(interval)
  }

  const stopAnimation = () => {
    if (animationInterval) {
      clearInterval(animationInterval)
      setAnimationInterval(null)
    }
    setIsPlaying(false)
  }

  const selectStep = (step: number) => {
    stopAnimation()
    setCurrentStep(step)
  }

  useEffect(() => {
    return () => {
      if (animationInterval) {
        clearInterval(animationInterval)
      }
    }
  }, [animationInterval])

  // Helper function to determine if a node is active
  const isNodeActive = (nodeStep: number) => {
    return currentStep === nodeStep
  }

  // Helper function to determine if a connection is active
  const isConnectionActive = (connectionStep: number) => {
    return currentStep === connectionStep
  }

  return (
    <div className={styles.diagramContainer} ref={containerRef}>
      <div className={styles.diagramControls}>
        <button className={`${styles.playButton} ${isPlaying ? styles.active : ""}`} onClick={togglePlay}>
          {isPlaying ? "Pause Animation" : "Play Animation"}
        </button>
        <div className={styles.stepIndicator}>
          {steps.map((_, index) => (
            <div
              key={index}
              className={`${styles.step} ${currentStep === index ? styles.active : ""}`}
              onClick={() => selectStep(index)}
              onMouseEnter={() => setHoveredElement(`step-${index}`)}
              onMouseLeave={() => setHoveredElement(null)}
            >
              {hoveredElement === `step-${index}` && <div className={styles.stepTooltip}>Step {index + 1}</div>}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.mobileWorkflow}>
        {/* Input Node */}
        <div className={styles.workflowCard}>
          <div
            className={`${styles.workflowNode} ${styles.inputNode} ${isNodeActive(1) ? styles.activeNode : ""}`}
            onMouseEnter={() => setHoveredElement("input")}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <div className={styles.nodeIcon}>
              <span className="material-icons">person</span>
            </div>
            <div className={styles.nodeContent}>
              <div className={styles.nodeTitle}>Input</div>
              <div className={styles.nodeSubtitle}>USER</div>
            </div>
            {hoveredElement === "input" && (
              <div className={styles.nodeTooltip}>User input that initiates the workflow</div>
            )}
          </div>
          {isConnectionActive(1) && (
            <div className={styles.flowIndicator}>
              <span className="material-icons">arrow_downward</span>
            </div>
          )}
        </div>

        {/* Researcher Node */}
        <div className={styles.workflowCard}>
          <div
            className={`${styles.workflowNode} ${styles.researcherNode} ${currentStep === 2 || currentStep === 4 ? styles.activeNode : ""}`}
            onMouseEnter={() => setHoveredElement("researcher")}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <div className={styles.nodeIcon}>
              <span className="material-icons">psychology</span>
            </div>
            <div className={styles.nodeContent}>
              <div className={styles.nodeTitle}>Researcher</div>
              <div className={styles.nodeSubtitle}>MODEL</div>
              <div className={`${styles.nodeAdhesive} ${isNodeActive(2) ? styles.adhesiveGlow : ""}`}>
                <span className={styles.adhesiveLabel}>VELCRO</span>
              </div>
            </div>
            {hoveredElement === "researcher" && (
              <div className={styles.nodeTooltip}>Processes input and searches for information</div>
            )}
            {(currentStep === 2 || currentStep === 4) && (
              <div className={styles.processingDots}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </div>

          {/* Web Search Tool - Only visible when relevant */}
          {currentStep >= 2 && currentStep <= 3 && (
            <div className={styles.toolsSection}>
              <div className={styles.toolsHeader}>
                <span className="material-icons">build</span>
                <span>Tools</span>
              </div>

              <div className={styles.toolsContainer}>
                {/* Web Search Tool */}
                <div
                  className={`${styles.toolNode} ${styles.singleTool} ${currentStep === 3 ? styles.activeTool : ""}`}
                  onMouseEnter={() => setHoveredElement("websearch")}
                  onMouseLeave={() => setHoveredElement(null)}
                >
                  <div className={styles.toolIcon}>
                    <span className="material-icons">search</span>
                  </div>
                  <div className={styles.toolLabel}>Web Search</div>
                  {hoveredElement === "websearch" && (
                    <div className={styles.nodeTooltip}>Searches the web for relevant information</div>
                  )}
                  {currentStep === 3 && (
                    <div className={styles.searchAnimation}>
                      <span className="material-icons">public</span>
                      <div className={styles.searchRings}>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Return flow from tool to Researcher */}
              {isConnectionActive(3) && (
                <div className={styles.returnFlow}>
                  <span className="material-icons">keyboard_return</span>
                  <span>Return to Researcher</span>
                </div>
              )}
            </div>
          )}

          {isConnectionActive(4) && (
            <div className={styles.flowIndicator}>
              <span className="material-icons">arrow_downward</span>
            </div>
          )}
        </div>

        {/* Output Node */}
        <div className={styles.workflowCard}>
          <div
            className={`${styles.workflowNode} ${styles.outputNode} ${isNodeActive(4) ? styles.activeNode : ""}`}
            onMouseEnter={() => setHoveredElement("output")}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <div className={styles.nodeIcon}>
              <span className="material-icons">article</span>
            </div>
            <div className={styles.nodeContent}>
              <div className={styles.nodeTitle}>Output</div>
              <div className={styles.nodeSubtitle}>RESULT</div>
            </div>
            {hoveredElement === "output" && (
              <div className={styles.nodeTooltip}>Final result generated from the workflow</div>
            )}
            {currentStep === 4 && (
              <div className={styles.outputAnimation}>
                <span className="material-icons">check_circle</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.stepDescription}>
        <p>{steps[currentStep].description}</p>
      </div>
    </div>
  )
}

// ComplexWorkflowDiagram component with mobile-first approach
const ComplexWorkflowDiagram: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [animationInterval, setAnimationInterval] = useState<NodeJS.Timeout | null>(null)
  const [hoveredElement, setHoveredElement] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [windowWidth, setWindowWidth] = useState<number>(0)

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    // Set initial width
    setWindowWidth(window.innerWidth)

    // Add resize listener
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const steps: StepInfo[] = [
    { description: "Initial state: AI agents are connected via appropriate adhesive types" },
    { description: "The Architect model processes the input requirements" },
    { description: "The Architect sends specifications to the Coder model using VELCRO adhesive" },
    { description: "The Coder model implements the code and uses the File Handler tool" },
    { description: "The Code Interpreter executes the code via the File Handler" },
    { description: "The Code Interpreter returns results to the Coder" },
    { description: "The Coder sends the final results to Output" },
  ]

  const togglePlay = () => {
    if (isPlaying) stopAnimation()
    else startAnimation()
  }

  const startAnimation = () => {
    setIsPlaying(true)
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev >= steps.length - 1 ? 0 : prev + 1))
    }, 3000)
    setAnimationInterval(interval)
  }

  const stopAnimation = () => {
    if (animationInterval) {
      clearInterval(animationInterval)
      setAnimationInterval(null)
    }
    setIsPlaying(false)
  }

  const selectStep = (step: number) => {
    stopAnimation()
    setCurrentStep(step)
  }

  useEffect(() => {
    return () => {
      if (animationInterval) clearInterval(animationInterval)
    }
  }, [animationInterval])

  // Helper function to determine if a node is active
  const isNodeActive = (nodeStep: number) => {
    return currentStep === nodeStep
  }

  // Helper function to determine if a connection is active
  const isConnectionActive = (connectionStep: number) => {
    return currentStep === connectionStep
  }

  return (
    <div className={styles.diagramContainer} ref={containerRef}>
      <div className={styles.diagramControls}>
        <button className={`${styles.playButton} ${isPlaying ? styles.active : ""}`} onClick={togglePlay}>
          {isPlaying ? "Pause Animation" : "Play Animation"}
        </button>
        <div className={styles.stepIndicator}>
          {steps.map((_, index) => (
            <div
              key={index}
              className={`${styles.step} ${currentStep === index ? styles.active : ""}`}
              onClick={() => selectStep(index)}
              onMouseEnter={() => setHoveredElement(`step-${index}`)}
              onMouseLeave={() => setHoveredElement(null)}
            >
              {hoveredElement === `step-${index}` && <div className={styles.stepTooltip}>Step {index + 1}</div>}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.mobileWorkflow}>
        {/* Input Node */}
        <div className={styles.workflowCard}>
          <div
            className={`${styles.workflowNode} ${styles.inputNode} ${isNodeActive(1) ? styles.activeNode : ""}`}
            onMouseEnter={() => setHoveredElement("input")}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <div className={styles.nodeIcon}>
              <span className="material-icons">topic</span>
            </div>
            <div className={styles.nodeContent}>
              <div className={styles.nodeTitle}>Input</div>
              <div className={styles.nodeSubtitle}>REQUIREMENTS</div>
            </div>
            {hoveredElement === "input" && (
              <div className={styles.nodeTooltip}>Project requirements and specifications</div>
            )}
          </div>
          {isConnectionActive(1) && (
            <div className={styles.flowIndicator}>
              <span className="material-icons">arrow_downward</span>
            </div>
          )}
        </div>

        {/* Architect Node */}
        <div className={styles.workflowCard}>
          <div
            className={`${styles.workflowNode} ${styles.architectNode} ${isNodeActive(1) || isNodeActive(2) ? styles.activeNode : ""}`}
            onMouseEnter={() => setHoveredElement("architect")}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <div className={styles.nodeIcon}>
              <span className="material-icons">architecture</span>
            </div>
            <div className={styles.nodeContent}>
              <div className={styles.nodeTitle}>Architect</div>
              <div className={styles.nodeSubtitle}>DESIGNER</div>
              <div className={`${styles.nodeAdhesive} ${currentStep >= 2 ? styles.adhesiveGlow : ""}`}>
                <span className={styles.adhesiveLabel}>VELCRO</span>
              </div>
            </div>
            {hoveredElement === "architect" && (
              <div className={styles.nodeTooltip}>Designs the overall code structure</div>
            )}
          </div>
          {isConnectionActive(2) && (
            <div className={styles.flowIndicator}>
              <span className="material-icons">arrow_downward</span>
            </div>
          )}
        </div>

        {/* Coder Node */}
        <div className={styles.workflowCard}>
          <div
            className={`${styles.workflowNode} ${styles.coderNode} ${currentStep >= 3 && currentStep <= 6 ? styles.activeNode : ""}`}
            onMouseEnter={() => setHoveredElement("coder")}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <div className={styles.nodeIcon}>
              <span className="material-icons">code</span>
            </div>
            <div className={styles.nodeContent}>
              <div className={styles.nodeTitle}>Coder</div>
              <div className={styles.nodeSubtitle}>DEVELOPER</div>
              <div className={`${styles.nodeAdhesive} ${currentStep >= 3 ? styles.adhesiveGlow : ""}`}>
                <span className={styles.adhesiveLabel}>TAPE</span>
              </div>
            </div>
            {hoveredElement === "coder" && (
              <div className={styles.nodeTooltip}>Implements the code based on specifications</div>
            )}
          </div>

          {/* Tools Section - Only visible when relevant */}
          {currentStep >= 3 && currentStep <= 5 && (
            <div className={styles.toolsSection}>
              <div className={styles.toolsHeader}>
                <span className="material-icons">build</span>
                <span>Tools</span>
              </div>

              <div className={styles.toolsContainer}>
                {/* File Handler Tool */}
                <div
                  className={`${styles.toolNode} ${currentStep >= 3 && currentStep <= 5 ? styles.activeTool : ""}`}
                  onMouseEnter={() => setHoveredElement("filehandler")}
                  onMouseLeave={() => setHoveredElement(null)}
                >
                  <div className={styles.toolIcon}>
                    <span className="material-icons">folder</span>
                  </div>
                  <div className={styles.toolLabel}>File Handler</div>
                  {hoveredElement === "filehandler" && (
                    <div className={styles.nodeTooltip}>Manages file operations and storage</div>
                  )}
                </div>

                {/* Connection between tools */}
                {isConnectionActive(4) && (
                  <div className={styles.toolConnection}>
                    <span className="material-icons">arrow_forward</span>
                  </div>
                )}

                {/* Code Interpreter Tool */}
                <div
                  className={`${styles.toolNode} ${currentStep >= 4 && currentStep <= 5 ? styles.activeTool : ""}`}
                  onMouseEnter={() => setHoveredElement("interpreter")}
                  onMouseLeave={() => setHoveredElement(null)}
                >
                  <div className={styles.toolIcon}>
                    <span className="material-icons">terminal</span>
                  </div>
                  <div className={styles.toolLabel}>Code Interpreter</div>
                  {hoveredElement === "interpreter" && (
                    <div className={styles.nodeTooltip}>Executes and runs the code</div>
                  )}
                </div>
              </div>

              {/* Return flow from tools to Coder */}
              {isConnectionActive(5) && (
                <div className={styles.returnFlow}>
                  <span className="material-icons">keyboard_return</span>
                  <span>Return to Coder</span>
                </div>
              )}
            </div>
          )}

          {isConnectionActive(6) && (
            <div className={styles.flowIndicator}>
              <span className="material-icons">arrow_downward</span>
            </div>
          )}
        </div>

        {/* Output Node */}
        <div className={styles.workflowCard}>
          <div
            className={`${styles.workflowNode} ${styles.outputNode} ${isNodeActive(6) ? styles.activeNode : ""}`}
            onMouseEnter={() => setHoveredElement("output")}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <div className={styles.nodeIcon}>
              <span className="material-icons">output</span>
            </div>
            <div className={styles.nodeContent}>
              <div className={styles.nodeTitle}>Output</div>
              <div className={styles.nodeSubtitle}>PRODUCT</div>
            </div>
            {hoveredElement === "output" && (
              <div className={styles.nodeTooltip}>Final product ready for deployment</div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.stepDescription}>
        <p>{steps[currentStep].description}</p>
      </div>
    </div>
  )
}

const AdhesivesDiagram: React.FC = () => {
  const [selectedAdhesive, setSelectedAdhesive] = useState<string>("glue")

  // Add this inside the AdhesivesDiagram component, right after the useState
  const [windowWidth, setWindowWidth] = useState<number>(0)

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    // Set initial width
    setWindowWidth(window.innerWidth)

    // Add resize listener
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const adhesiveTypes = {
    glue: {
      name: "GLUE",
      description:
        "GLUE forms a permanent, one-way binding between components. It enables stable, reliable communication patterns in a workflow.",
      connectionClass: styles.adhesiveGlue,
    },
    velcro: {
      name: "VELCRO",
      description:
        "VELCRO creates a bidirectional, detachable connection. Components can be easily reconfigured while maintaining clear dependencies.",
      connectionClass: styles.adhesiveVelcro,
    },
    tape: {
      name: "TAPE",
      description:
        "TAPE establishes a directional, temporary binding. It's perfect for sequential operations with clear data flow direction.",
      connectionClass: styles.adhesiveTape,
    },
    staple: {
      name: "STAPLE",
      description:
        "STAPLE forms fixed, secure connections for critical data. It ensures reliability in workflows where data integrity is paramount.",
      connectionClass: styles.adhesiveStaple,
    },
  }

  return (
    <div className={styles.diagramContainer}>
      <div className={styles.adhesivesDiagram}>
        <div className={styles.adhesivesSelector}>
          {Object.keys(adhesiveTypes).map((type) => (
            <button
              key={type}
              className={`${styles.adhesiveButton} ${selectedAdhesive === type ? styles.active : ""}`}
              onClick={() => setSelectedAdhesive(type)}
            >
              {adhesiveTypes[type as keyof typeof adhesiveTypes].name}
            </button>
          ))}
        </div>

        <div className={styles.adhesiveVisualization}>
          <div className={`${styles.model} ${styles.modelLeft}`}>
            <div className={styles.modelIcon}>
              <span className="material-icons">psychology</span>
            </div>
            <div className={styles.modelLabel}>Model A</div>
          </div>

          <div
            className={`${styles.connection} ${adhesiveTypes[selectedAdhesive as keyof typeof adhesiveTypes].connectionClass}`}
          >
            <div className={styles.adhesiveName}>
              {adhesiveTypes[selectedAdhesive as keyof typeof adhesiveTypes].name}
            </div>
          </div>

          <div className={`${styles.model} ${styles.modelRight}`}>
            <div className={styles.modelIcon}>
              <span className="material-icons">memory</span>
            </div>
            <div className={styles.modelLabel}>Model B</div>
          </div>
        </div>

        <div className={styles.adhesiveDescription}>
          <p>{adhesiveTypes[selectedAdhesive as keyof typeof adhesiveTypes].description}</p>
        </div>
      </div>
    </div>
  )
}

const TeamCommunicationDiagram: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [animationInterval, setAnimationInterval] = useState<NodeJS.Timeout | null>(null)

  // Add this inside the TeamCommunicationDiagram component, right after the useState declarations
  const [windowWidth, setWindowWidth] = useState<number>(0)

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    // Set initial width
    setWindowWidth(window.innerWidth)

    // Add resize listener
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const steps: StepInfo[] = [
    { description: "Initial state: Team composed of models with different specialties" },
    { description: "Lead model communicates tasks and context to team members" },
    { description: "Team members access tools through shared adhesive bindings" },
    { description: "Results from tools are processed by the team" },
    { description: "Team collaborates to produce final output" },
  ]

  const togglePlay = () => {
    if (isPlaying) {
      stopAnimation()
    } else {
      startAnimation()
    }
  }

  const startAnimation = () => {
    setIsPlaying(true)
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          return 0
        }
        return prev + 1
      })
    }, 3000)
    setAnimationInterval(interval)
  }

  const stopAnimation = () => {
    if (animationInterval) {
      clearInterval(animationInterval)
      setAnimationInterval(null)
    }
    setIsPlaying(false)
  }

  const selectStep = (step: number) => {
    stopAnimation()
    setCurrentStep(step)
  }

  useEffect(() => {
    return () => {
      if (animationInterval) {
        clearInterval(animationInterval)
      }
    }
  }, [animationInterval])

  return (
    <div className={styles.diagramContainer}>
      <div className={styles.diagramControls}>
        <button className={`${styles.playButton} ${isPlaying ? styles.active : ""}`} onClick={togglePlay}>
          {isPlaying ? "Pause Animation" : "Play Animation"}
        </button>
        <div className={styles.stepIndicator}>
          {steps.map((_, index) => (
            <div
              key={index}
              className={`${styles.step} ${currentStep === index ? styles.active : ""}`}
              onClick={() => selectStep(index)}
            />
          ))}
        </div>
      </div>

      <div className={styles.teamCommunicationDiagram}>
        <div className={styles.teamContainer}>
          <div className={styles.teamHeader}>Research Team</div>
          <div className={styles.teamContent}>
            <div className={`${styles.teamModel} ${styles.leadModel}`}>
              <span className="material-icons">star</span>
              <span className={styles.modelName}>Lead Researcher</span>
              <div className={`${styles.msgBubble} ${currentStep === 1 ? styles.visible : ""}`}>
                Let's analyze this data together
              </div>
            </div>

            <div className={styles.teamModels}>
              <div className={styles.teamModel}>
                <span className="material-icons">analytics</span>
                <span className={styles.modelName}>Data Analyst</span>
              </div>
              <div className={styles.teamModel}>
                <span className="material-icons">trending_up</span>
                <span className={styles.modelName}>Statistician</span>
              </div>
            </div>

            <div className={`${styles.teamTool} ${currentStep >= 2 ? styles.active : ""}`}>
              <span className="material-icons">table_chart</span>
              <span className={styles.toolName}>Data Processing</span>
              <div className={`${styles.toolAdhesive} ${currentStep >= 2 ? styles.visible : ""}`}>VELCRO</div>
              <div className={`${styles.toolResult} ${currentStep >= 3 ? styles.visible : ""}`}>
                Data analysis complete
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.teamFlow} ${currentStep >= 1 ? styles.active : ""}`}>
          <span className="material-icons">swap_horiz</span>
          <span className={styles.flowText}>Bidirectional</span>
        </div>

        <div className={styles.teamContainer}>
          <div className={styles.teamHeader}>Implementation Team</div>
          <div className={styles.teamContent}>
            <div className={`${styles.teamModel} ${styles.leadModel}`}>
              <span className="material-icons">engineering</span>
              <span className={styles.modelName}>Systems Engineer</span>
            </div>

            <div className={styles.teamModels}>
              <div className={styles.teamModel}>
                <span className="material-icons">code</span>
                <span className={styles.modelName}>Developer</span>
              </div>
              <div className={styles.teamModel}>
                <span className="material-icons">bug_report</span>
                <span className={styles.modelName}>Tester</span>
              </div>
            </div>

            <div className={`${styles.teamTool} ${currentStep >= 2 ? styles.active : ""}`}>
              <span className="material-icons">terminal</span>
              <span className={styles.toolName}>Code Execution</span>
              <div className={`${styles.toolAdhesive} ${currentStep >= 2 ? styles.visible : ""}`}>GLUE</div>
              <div className={`${styles.toolResult} ${currentStep >= 3 ? styles.visible : ""}`}>
                Implementation verified
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.stepDescription}>
        <p>{steps[currentStep].description}</p>
      </div>
    </div>
  )
}

const MagnetizeFlowDiagram: React.FC = () => {
  const [selectedFlow, setSelectedFlow] = useState<string>("push")

  // Add this inside the MagnetizeFlowDiagram component, right after the useState
  const [windowWidth, setWindowWidth] = useState<number>(0)

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    // Set initial width
    setWindowWidth(window.innerWidth)

    // Add resize listener
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const flowTypes = {
    push: {
      name: "Push Flow",
      description:
        "In Push flow, models push information to other models. The originating model takes initiative and controls when information is sent.",
      connectionClass: styles.flowPush,
      arrow: "→",
      code: `const researchTeam = new Team({\n  flow: 'push',\n  models: [researchLeader, analyst, statistician]\n});`,
    },
    pull: {
      name: "Pull Flow",
      description:
        "In Pull flow, models request information from other models. The receiving model initiates the exchange when it needs data.",
      connectionClass: styles.flowPull,
      arrow: "←",
      code: `const implementationTeam = new Team({\n  flow: 'pull',\n  models: [engineer, developer, tester]\n});`,
    },
    repulsion: {
      name: "Repulsion Flow",
      description:
        "In Repulsion flow, models operate independently with minimal communication. Each model focuses on its own tasks.",
      connectionClass: styles.flowRepulsion,
      arrow: "⊥",
      code: `const autonomousTeam = new Team({\n  flow: 'repulsion',\n  models: [specialist1, specialist2, specialist3]\n});`,
    },
  }

  return (
    <div className={styles.diagramContainer}>
      <div className={styles.flowDiagram}>
        <div className={styles.flowSelector}>
          {Object.keys(flowTypes).map((type) => (
            <button
              key={type}
              className={`${styles.flowButton} ${selectedFlow === type ? styles.active : ""}`}
              onClick={() => setSelectedFlow(type)}
            >
              {flowTypes[type as keyof typeof flowTypes].name}
            </button>
          ))}
        </div>

        <div className={styles.flowVisualization}>
          <div className={styles.team}>
            <div className={styles.teamIcon}>
              <span className="material-icons">groups</span>
            </div>
            <div className={styles.teamLabel}>Team A</div>
            <div className={styles.teamModels}>
              <div className={styles.teamModel}>
                <span className="material-icons">person</span>
                <span className={styles.modelName}>Model 1</span>
              </div>
              <div className={styles.teamModel}>
                <span className="material-icons">person</span>
                <span className={styles.modelName}>Model 2</span>
              </div>
            </div>
          </div>

          <div
            className={`${styles.teamConnection} ${flowTypes[selectedFlow as keyof typeof flowTypes].connectionClass}`}
          >
            <div className={styles.flowArrow}>{flowTypes[selectedFlow as keyof typeof flowTypes].arrow}</div>
          </div>

          <div className={styles.team}>
            <div className={styles.teamIcon}>
              <span className="material-icons">groups</span>
            </div>
            <div className={styles.teamLabel}>Team B</div>
            <div className={styles.teamModels}>
              <div className={styles.teamModel}>
                <span className="material-icons">person</span>
                <span className={styles.modelName}>Model 3</span>
              </div>
              <div className={styles.teamModel}>
                <span className="material-icons">person</span>
                <span className={styles.modelName}>Model 4</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.flowDescription}>
          <p>{flowTypes[selectedFlow as keyof typeof flowTypes].description}</p>
        </div>

        <div className={styles.codeExample}>
          <pre className={styles.flowCode}>{flowTypes[selectedFlow as keyof typeof flowTypes].code}</pre>
        </div>
      </div>
    </div>
  )
}

const GlueAnimatedDiagrams: React.FC = () => {
  // Add this right before the return statement in the GlueAnimatedDiagrams component
  const [windowWidth, setWindowWidth] = useState<number>(0)

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    // Set initial width
    setWindowWidth(window.innerWidth)

    // Add resize listener
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className={styles.glueDiagramsContainer}>
      <h2>Understanding GLUE Component Interactions</h2>
      <p className={styles.diagramsIntro}>
        The following diagrams visualize how components interact within the GLUE framework. Explore each diagram to
        better understand workflows, adhesives, and communication patterns.
      </p>

      <div className={styles.diagramSection}>
        <h3>Basic Workflow</h3>
        <p>This diagram shows a linear workflow with a model connected to a tool.</p>
        <BasicWorkflowDiagram />
      </div>

      <div className={styles.diagramSection}>
        <h3>Complex Workflow</h3>
        <p>This diagram demonstrates a more complex workflow with multiple models and tools collaborating.</p>
        <ComplexWorkflowDiagram />
      </div>

      <div className={styles.diagramSection}>
        <h3>Adhesive Types</h3>
        <p>Explore the different types of adhesives that define how components communicate.</p>
        <AdhesivesDiagram />
      </div>

      <div className={styles.diagramSection}>
        <h3>Team Communication</h3>
        <p>Visualize how models in a team communicate and share tools.</p>
        <TeamCommunicationDiagram />
      </div>

      <div className={styles.diagramSection}>
        <h3>Flow Patterns (Magnetize)</h3>
        <p>Explore the different flow patterns that define team interactions.</p>
        <MagnetizeFlowDiagram />
      </div>
    </div>
  )
}

export default GlueAnimatedDiagrams

