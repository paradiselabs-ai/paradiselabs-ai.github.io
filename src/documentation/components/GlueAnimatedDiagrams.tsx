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

// Replace the AdhesivesDiagram component with this new implementation
const AdhesivesDiagram: React.FC = () => {
  const [selectedAdhesive, setSelectedAdhesive] = useState<string>("glue")
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
        "Forms a permanent connection that maintains consistent data flow. Ideal for components that need reliable, unchanging communication paths.",
      icon: "link",
      color: "rgb(90, 219, 242)",
      properties: ["Permanent", "One-way", "Reliable"],
    },
    velcro: {
      name: "VELCRO",
      description:
        "Creates a flexible, two-way connection that can be attached and detached as needed. Perfect for components that exchange information in both directions.",
      icon: "swap_horiz",
      color: "rgb(132, 94, 247)",
      properties: ["Bidirectional", "Detachable", "Adaptable"],
    },
    tape: {
      name: "TAPE",
      description:
        "Establishes a temporary, directional binding that guides information flow. Excellent for sequential operations with clear data paths.",
      icon: "arrow_forward",
      color: "rgb(255, 183, 77)",
      properties: ["Directional", "Temporary", "Sequential"],
    },
  }

  return (
    <div className={styles.diagramContainer}>
      <div className={styles.adhesivesSelector}>
        {Object.keys(adhesiveTypes).map((type) => (
          <button
            key={type}
            className={`${styles.adhesiveButton} ${selectedAdhesive === type ? styles.active : ""}`}
            onClick={() => setSelectedAdhesive(type)}
            style={{
              borderColor:
                selectedAdhesive === type ? adhesiveTypes[type as keyof typeof adhesiveTypes].color : undefined,
              boxShadow:
                selectedAdhesive === type
                  ? `0 0 10px ${adhesiveTypes[type as keyof typeof adhesiveTypes].color}40`
                  : undefined,
            }}
          >
            <span className="material-icons" style={{ color: adhesiveTypes[type as keyof typeof adhesiveTypes].color }}>
              {adhesiveTypes[type as keyof typeof adhesiveTypes].icon}
            </span>
            {adhesiveTypes[type as keyof typeof adhesiveTypes].name}
          </button>
        ))}
      </div>

      <div className={styles.adhesiveShowcase}>
        <div
          className={styles.adhesiveVisual}
          style={{
            backgroundColor: `${adhesiveTypes[selectedAdhesive as keyof typeof adhesiveTypes].color}15`,
            borderColor: `${adhesiveTypes[selectedAdhesive as keyof typeof adhesiveTypes].color}30`,
          }}
        >
          <div className={styles.adhesiveIconLarge}>
            <span
              className="material-icons"
              style={{ color: adhesiveTypes[selectedAdhesive as keyof typeof adhesiveTypes].color }}
            >
              {adhesiveTypes[selectedAdhesive as keyof typeof adhesiveTypes].icon}
            </span>
          </div>

          <div className={styles.adhesiveModels}>
            <div className={styles.adhesiveModel}>
              <div className={styles.modelCircle}>
                <span className="material-icons">psychology</span>
              </div>
              <div className={styles.modelLabel}>Model A</div>
            </div>

            <div
              className={styles.adhesiveConnection}
              style={{ backgroundColor: adhesiveTypes[selectedAdhesive as keyof typeof adhesiveTypes].color }}
            >
              <div
                className={styles.connectionAnimation}
                style={{ backgroundColor: adhesiveTypes[selectedAdhesive as keyof typeof adhesiveTypes].color }}
              ></div>
            </div>

            <div className={styles.adhesiveModel}>
              <div className={styles.modelCircle}>
                <span className="material-icons">memory</span>
              </div>
              <div className={styles.modelLabel}>Model B</div>
            </div>
          </div>

          <div className={styles.adhesiveProperties}>
            {adhesiveTypes[selectedAdhesive as keyof typeof adhesiveTypes].properties.map((property, index) => (
              <div
                key={index}
                className={styles.propertyTag}
                style={{ backgroundColor: `${adhesiveTypes[selectedAdhesive as keyof typeof adhesiveTypes].color}20` }}
              >
                {property}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.adhesiveInfo}>
          <h3
            className={styles.adhesiveTitle}
            style={{ color: adhesiveTypes[selectedAdhesive as keyof typeof adhesiveTypes].color }}
          >
            {adhesiveTypes[selectedAdhesive as keyof typeof adhesiveTypes].name}
          </h3>
          <p className={styles.adhesiveDescription}>
            {adhesiveTypes[selectedAdhesive as keyof typeof adhesiveTypes].description}
          </p>
        </div>
      </div>
    </div>
  )
}

// Replace the TeamCommunicationDiagram component with this new implementation
const TeamCommunicationDiagram: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [animationInterval, setAnimationInterval] = useState<NodeJS.Timeout | null>(null)
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

  const isDesktop = windowWidth >= 768

  const steps: StepInfo[] = [
    { description: "Team structure: Specialized models work together through a central coordination point" },
    { description: "Task distribution: Lead model assigns tasks and provides context to team members" },
    { description: "Resource access: Team members connect to shared tools through adhesive bindings" },
    { description: "Collaboration: Team processes results from tools and shares information" },
    { description: "Delivery: The team produces a unified output from their combined efforts" },
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

      <div className={`${styles.teamHubContainer} ${isDesktop ? styles.teamHubDesktop : ""}`}>
        <div className={styles.teamHub}>
          <div className={`${styles.hubCenter} ${currentStep >= 1 ? styles.active : ""}`}>
            <div className={styles.hubIcon}>
              <span className="material-icons">groups</span>
            </div>
            <div className={styles.hubLabel}>Team Hub</div>

            {currentStep === 1 && <div className={styles.communicationPulse}></div>}
          </div>

          <div className={`${styles.teamMembers} ${isDesktop ? styles.teamMembersDesktop : ""}`}>
            <div className={`${styles.teamMember} ${styles.leadMember} ${currentStep >= 1 ? styles.activeMember : ""}`}>
              <div className={styles.memberIcon}>
                <span className="material-icons">star</span>
              </div>
              <div className={styles.memberLabel}>Lead</div>
              {currentStep === 1 && (
                <div className={styles.messageBubble}>
                  <span>Assigning tasks</span>
                </div>
              )}
            </div>

            <div className={`${styles.teamMember} ${currentStep >= 2 ? styles.activeMember : ""}`}>
              <div className={styles.memberIcon}>
                <span className="material-icons">analytics</span>
              </div>
              <div className={styles.memberLabel}>Analyst</div>
              {currentStep === 2 && (
                <div className={styles.toolAccess}>
                  <span className="material-icons">build</span>
                </div>
              )}
            </div>

            <div className={`${styles.teamMember} ${currentStep >= 2 ? styles.activeMember : ""}`}>
              <div className={styles.memberIcon}>
                <span className="material-icons">code</span>
              </div>
              <div className={styles.memberLabel}>Developer</div>
              {currentStep === 2 && (
                <div className={styles.toolAccess}>
                  <span className="material-icons">terminal</span>
                </div>
              )}
            </div>

            <div className={`${styles.teamMember} ${currentStep >= 2 ? styles.activeMember : ""}`}>
              <div className={styles.memberIcon}>
                <span className="material-icons">bug_report</span>
              </div>
              <div className={styles.memberLabel}>Tester</div>
              {currentStep === 2 && (
                <div className={styles.toolAccess}>
                  <span className="material-icons">science</span>
                </div>
              )}
            </div>
          </div>

          {currentStep >= 3 && (
            <div className={styles.teamTools}>
              <div className={styles.toolsLabel}>Shared Resources</div>
              <div className={styles.toolsGrid}>
                <div className={styles.toolItem}>
                  <span className="material-icons">build</span>
                  <span>Analysis</span>
                </div>
                <div className={styles.toolItem}>
                  <span className="material-icons">terminal</span>
                  <span>Code</span>
                </div>
                <div className={styles.toolItem}>
                  <span className="material-icons">science</span>
                  <span>Testing</span>
                </div>
                <div className={styles.toolItem}>
                  <span className="material-icons">storage</span>
                  <span>Data</span>
                </div>
              </div>

              {currentStep === 3 && (
                <div className={styles.toolResults}>
                  <span className="material-icons">check_circle</span>
                  <span>Processing complete</span>
                </div>
              )}
            </div>
          )}

          {currentStep === 4 && (
            <div className={styles.teamOutput}>
              <div className={styles.outputIcon}>
                <span className="material-icons">output</span>
              </div>
              <div className={styles.outputLabel}>Final Output</div>
              <div className={styles.collaborationLines}></div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.stepDescription}>
        <p>{steps[currentStep].description}</p>
      </div>
    </div>
  )
}

// Replace the MagnetizeFlowDiagram component with this new implementation
const MagnetizeFlowDiagram: React.FC = () => {
  const [selectedFlow, setSelectedFlow] = useState<string>("push")
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
        "Information flows from the source to destination models. The source model initiates and controls when information is sent, similar to a broadcast pattern.",
      icon: "arrow_downward",
      color: "#4ade80",
      animation: styles.pushAnimation,
    },
    pull: {
      name: "Pull Flow",
      description:
        "Information is requested by destination models when needed. The receiving model initiates the exchange, creating an on-demand information retrieval pattern.",
      icon: "arrow_upward",
      color: "#60a5fa",
      animation: styles.pullAnimation,
    },
    repulsion: {
      name: "Repulsion Flow",
      description:
        "Models operate independently with minimal direct communication. Each model focuses on its own tasks, sharing only essential information through a central repository.",
      icon: "block",
      color: "#f87171",
      animation: styles.repulsionAnimation,
    },
  }

  const isDesktop = windowWidth >= 768

  return (
    <div className={styles.diagramContainer}>
      <div className={styles.flowSelector}>
        {Object.keys(flowTypes).map((type) => (
          <button
            key={type}
            className={`${styles.flowButton} ${selectedFlow === type ? styles.active : ""}`}
            onClick={() => setSelectedFlow(type)}
            style={{
              borderColor: selectedFlow === type ? flowTypes[type as keyof typeof flowTypes].color : undefined,
              boxShadow:
                selectedFlow === type ? `0 0 10px ${flowTypes[type as keyof typeof flowTypes].color}40` : undefined,
            }}
          >
            <span className="material-icons" style={{ color: flowTypes[type as keyof typeof flowTypes].color }}>
              {flowTypes[type as keyof typeof flowTypes].icon}
            </span>
            {flowTypes[type as keyof typeof flowTypes].name}
          </button>
        ))}
      </div>

      <div className={styles.flowPatternContainer}>
        <div className={styles.flowVisualizer}>
          <div
            className={styles.flowPattern}
            style={{ backgroundColor: `${flowTypes[selectedFlow as keyof typeof flowTypes].color}10` }}
          >
            <div className={`${styles.flowTeams} ${isDesktop ? styles.flowTeamsDesktop : ""}`}>
              <div className={styles.flowTeam}>
                <div className={styles.teamCircle}>
                  <span className="material-icons">groups</span>
                </div>
                <div className={styles.teamLabel}>Team A</div>
                <div className={styles.teamDots}>
                  <div className={styles.teamDot}></div>
                  <div className={styles.teamDot}></div>
                  <div className={styles.teamDot}></div>
                </div>
              </div>

              <div
                className={`${styles.flowConnection} ${flowTypes[selectedFlow as keyof typeof flowTypes].animation} ${isDesktop ? styles.flowConnectionDesktop : ""}`}
                style={{ backgroundColor: flowTypes[selectedFlow as keyof typeof flowTypes].color }}
              >
                <span
                  className={`material-icons ${styles.arrowDesktop}`}
                  style={{ color: flowTypes[selectedFlow as keyof typeof flowTypes].color }}
                >
                  {isDesktop
                    ? selectedFlow === "push"
                      ? "arrow_forward"
                      : selectedFlow === "pull"
                        ? "arrow_back"
                        : "block"
                    : flowTypes[selectedFlow as keyof typeof flowTypes].icon}
                </span>
              </div>

              <div className={styles.flowTeam}>
                <div className={styles.teamCircle}>
                  <span className="material-icons">groups</span>
                </div>
                <div className={styles.teamLabel}>Team B</div>
                <div className={styles.teamDots}>
                  <div className={styles.teamDot}></div>
                  <div className={styles.teamDot}></div>
                  <div className={styles.teamDot}></div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.flowInfo}>
            <h3 className={styles.flowTitle} style={{ color: flowTypes[selectedFlow as keyof typeof flowTypes].color }}>
              {flowTypes[selectedFlow as keyof typeof flowTypes].name}
            </h3>
            <p className={styles.flowDescription}>{flowTypes[selectedFlow as keyof typeof flowTypes].description}</p>
          </div>
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
