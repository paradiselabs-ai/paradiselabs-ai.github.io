/* src\documentation\Docs.tsx */ 
import React, { useState, useEffect, useRef, useMemo } from 'react';
import './Docs.css';

interface CodeOverlayProps {
  isVisible: boolean;
  code: string;
  title: string;
  filename: string;
  onClose: () => void;
}

// Function to abbreviate long filenames
const abbreviateFilename = (filename: string, maxLength: number = 25, isMobile: boolean = false): string => {
  // Use a shorter maxLength for mobile devices
  const effectiveMaxLength = isMobile ? Math.min(maxLength, 15) : maxLength;
  
  if (filename.length <= effectiveMaxLength) return filename;
  
  const parts = filename.split('/');
  const name = parts.pop() || '';
  
  // If filename without path is already shorter than max length, return it
  if (name.length <= effectiveMaxLength) return name;
  
  // Split name and extension
  const lastDotIndex = name.lastIndexOf('.');
  if (lastDotIndex === -1) {
    // No extension - just truncate
    return name.substring(0, effectiveMaxLength - 3) + '...';
  }
  
  const extension = name.substring(lastDotIndex);
  const baseName = name.substring(0, lastDotIndex);
  
  // Make sure we have enough space for extension and ellipsis
  const maxBaseLength = Math.max(effectiveMaxLength - extension.length - 3, 3);
  return baseName.substring(0, maxBaseLength) + '...' + extension;
};

const CodeOverlay: React.FC<CodeOverlayProps> = ({ isVisible, code, title, filename, onClose }) => {
  const codeLines = code.split('\n');
  const [currentLineIndex, setCurrentLineIndex] = useState<number | null>(null);
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<number[]>([]);
  const [currentSearchIndex, setCurrentSearchIndex] = useState<number>(0);
  const [expandedFolders, setExpandedFolders] = useState<{[key: string]: boolean}>({
    'root': true,
    'src': true,
    'config': false,
    'docs': false
  });
  const [highlightedLines, setHighlightedLines] = useState<{start: number, end: number} | null>(null);
  const [clickedSection, setClickedSection] = useState<string | null>(null);
  const [isMobilePanel, setIsMobilePanel] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  
  // Detect mobile view
  useEffect(() => {
    const checkMobileView = () => {
      const isMobile = window.innerWidth <= 768;
      setIsMobileView(isMobile);
      // Set active panel to 'files' by default on desktop, null on mobile
      setActivePanel(isMobile ? null : 'files');
      setIsMobilePanel(!isMobile);
    };
    
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    
    return () => {
      window.removeEventListener('resize', checkMobileView);
    };
  }, []);
  
  // Copy code to clipboard
  const copyCode = () => {
    navigator.clipboard.writeText(code).then(() => {
      // Show feedback (could add a state for this if needed)
      const copyBtn = document.querySelector('.code-overlay-btn.copy-btn span');
      if (copyBtn) {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyBtn.textContent = 'Copy';
        }, 2000);
      }
    });
  };
  
  // Download code as file
  const downloadCode = () => {
    const element = document.createElement('a');
    const file = new Blob([code], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = filename || 'glue-code.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Highlight a line when hovered
  const highlightLine = (index: number) => {
    // Only set current line if we're not highlighting a block
    if (!highlightedLines) {
      setCurrentLineIndex(index);
    }
  };

  // Clear line highlight
  const clearLineHighlight = () => {
    // Only clear current line if we're not highlighting a block
    if (!highlightedLines) {
      setCurrentLineIndex(null);
    }
  };
  
  // Clear highlighted block
  const clearHighlightedBlock = () => {
    setHighlightedLines(null);
    setCurrentLineIndex(null);
  };

  // Toggle sidebar panel
  const togglePanel = (panel: string) => {
    if (activePanel === panel) {
      // If same panel is clicked, toggle it
      setActivePanel(null);
      setIsMobilePanel(false);
    } else {
      // Switch to new panel
      setActivePanel(panel);
      setIsMobilePanel(true);
    }
  };

  // Toggle folder expansion
  const toggleFolder = (folderName: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderName]: !prev[folderName]
    }));
  };

  // Search functionality
  const searchInCode = (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }
    
    const results: number[] = [];
    codeLines.forEach((line, index) => {
      if (line.toLowerCase().includes(term.toLowerCase())) {
        results.push(index);
      }
    });
    
    setSearchResults(results);
    if (results.length > 0) {
      setCurrentLineIndex(results[0]);
      setCurrentSearchIndex(0);
    }
  };

  // Navigate search results
  const navigateSearch = (direction: 'next' | 'prev') => {
    if (searchResults.length === 0) return;
    
    let newIndex = currentSearchIndex;
    if (direction === 'next') {
      newIndex = (currentSearchIndex + 1) % searchResults.length;
    } else {
      newIndex = (currentSearchIndex - 1 + searchResults.length) % searchResults.length;
    }
    
    setCurrentSearchIndex(newIndex);
    setCurrentLineIndex(searchResults[newIndex]);
  };

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (highlightedLines) {
          clearHighlightedBlock();
        } else if (isVisible) {
          onClose();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, onClose, highlightedLines, clearHighlightedBlock]);

  // Disable body scroll when overlay is visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  // Clear highlight when clicking outside the highlighted lines
  const handleCodeAreaClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (highlightedLines) {
      // Get the clicked element
      const target = e.target as HTMLElement;
      // If the click is not on a highlighted line (or its children), clear the highlight
      if (!target.closest('.block-highlighted')) {
        clearHighlightedBlock();
      }
    }
  };

  // Scroll the line numbers to match code content
  useEffect(() => {
    const codeContainer = document.querySelector('.code-overlay-code');
    const lineNumbersContainer = document.querySelector('.code-overlay-line-numbers');
    
    if (!codeContainer || !lineNumbersContainer) return;
    
    const handleScroll = () => {
      lineNumbersContainer.scrollTop = codeContainer.scrollTop;
    };
    
    // Initial sync
    lineNumbersContainer.scrollTop = codeContainer.scrollTop;
    
    // Add scroll event listener
    codeContainer.addEventListener('scroll', handleScroll);
    
    return () => {
      codeContainer.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);

  // Generate minimap blocks based on code content
  const renderMinimap = () => {
    return codeLines.map((line, index) => {
      let classes = 'minimap-block';
      if (line.includes('glue') || line.includes('model') || line.includes('tool')) {
        classes += ' keyword';
      } else if (line.includes('"') || line.includes("'")) {
        classes += ' string';
      } else if (line.includes('//')) {
        classes += ' comment';
      }
      return <div key={index} className={classes} style={{ width: `${Math.min(95, line.length)}%` }} />;
    });
  };
  
  // Pre-process the code for syntax highlighting
  const processedCodeLines = useMemo(() => {
    // Ensure each line is properly processed
    return codeLines.map(line => {
      // Handle completely empty lines to maintain spacing
      if (line.trim() === '') {
        return ' '; // Use a space instead of &nbsp; for better handling
      }
      return formatCodeWithSyntaxHighlighting(line);
    });
  }, [code]);

  // Generate file icons based on extension
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch(extension) {
      case 'glue':
        return <span className="material-icons" style={{color: '#34B8CE'}}>code</span>;
      case 'json':
        return <span className="material-icons" style={{color: '#FFC107'}}>settings</span>;
      case 'md':
        return <span className="material-icons" style={{color: '#7CB342'}}>description</span>;
      case 'js':
      case 'jsx':
        return <span className="material-icons" style={{color: '#FFCA28'}}>javascript</span>;
      case 'ts':
      case 'tsx':
        return <span className="material-icons" style={{color: '#2979FF'}}>data_object</span>;
      case 'css':
        return <span className="material-icons" style={{color: '#E91E63'}}>style</span>;
      case 'html':
        return <span className="material-icons" style={{color: '#FF5722'}}>html</span>;
      case 'py':
        return <span className="material-icons" style={{color: '#4CAF50'}}>code</span>;
      case 'sh':
        return <span className="material-icons" style={{color: '#607D8B'}}>terminal</span>;
      default:
        return <span className="material-icons">insert_drive_file</span>;
    }
  };

  // Render the enhanced file explorer panel
  const renderFilesPanel = () => {
    // Extract project name from filename path
    const pathParts = filename.split('/');
    const currentFileName = pathParts.pop() || '';
    const project = 'GLUE Project';
    
    // Scroll to section when clicking outline item
    const navigateToSection = (section: string) => {
      // Clear any existing highlighted sections first
      setHighlightedLines(null);
      
      // Set clicked section for animation feedback immediately
      setClickedSection(section);
      
      // Schedule cleanup of the animation
      setTimeout(() => setClickedSection(null), 500);
      
      // Find matching section in code
      const lineIndex = codeLines.findIndex(line => 
        line.toLowerCase().includes(section.toLowerCase())
      );
      
      // Only proceed if a matching line was found
      if (lineIndex >= 0) {
        // Handle special cases for model/tool section differently
        if (section === 'model' || section === 'tool') {
          // Find all matching blocks
          const blockPattern = new RegExp(`^\\s*${section}\\s+\\w+\\s*\\{`, 'i');
          const blocks: {start: number, end: number}[] = [];
          
          // Find the first instance for scrolling
          const firstModelIndex = lineIndex;
          
          // Find all matching blocks
          codeLines.forEach((line, index) => {
            if (line.match(blockPattern)) {
              // Found a block start
              const startLine = index;
              let endLine = index;
              let bracketCount = 1; // Start with 1 for the opening bracket
              
              // Find the matching closing bracket
              for (let i = index + 1; i < codeLines.length; i++) {
                const currentLine = codeLines[i];
                const openBrackets = (currentLine.match(/\{/g) || []).length;
                const closeBrackets = (currentLine.match(/\}/g) || []).length;
                
                bracketCount += openBrackets - closeBrackets;
                
                if (bracketCount <= 0) {
                  endLine = i;
                  blocks.push({start: startLine, end: endLine});
                  break;
                }
              }
            }
          });
          
          // If we found blocks, highlight them all
          if (blocks.length > 0) {
            // Create a merged highlight block from first to last
            const allStart = Math.min(...blocks.map(b => b.start));
            const allEnd = Math.max(...blocks.map(b => b.end));
            setHighlightedLines({start: allStart, end: allEnd});
            
            // Set current line to the first match and scroll there
            setCurrentLineIndex(firstModelIndex);
            scrollToLine(firstModelIndex);
          }
        } else {
          // Regular section handling (single block)
          const startLine = lineIndex;
          let endLine = lineIndex;
          let bracketCount = 0;
          let inBlock = false;
          
          // Find the opening bracket if it exists on this line
          if (codeLines[lineIndex].includes('{')) {
            inBlock = true;
            bracketCount = 1;
            
            // Search forward for the matching closing bracket
            for (let i = lineIndex + 1; i < codeLines.length; i++) {
              const line = codeLines[i];
              const openBrackets = (line.match(/\{/g) || []).length;
              const closeBrackets = (line.match(/\}/g) || []).length;
              
              bracketCount += openBrackets - closeBrackets;
              
              if (bracketCount <= 0) {
                endLine = i;
                break;
              }
            }
          } else {
            // Look ahead for the opening bracket
            for (let i = lineIndex + 1; i < Math.min(lineIndex + 5, codeLines.length); i++) {
              if (codeLines[i].includes('{')) {
                inBlock = true;
                bracketCount = 1;
                
                // Search forward for the matching closing bracket
                for (let j = i + 1; j < codeLines.length; j++) {
                  const line = codeLines[j];
                  const openBrackets = (line.match(/\{/g) || []).length;
                  const closeBrackets = (line.match(/\}/g) || []).length;
                  
                  bracketCount += openBrackets - closeBrackets;
                  
                  if (bracketCount <= 0) {
                    endLine = j;
                    break;
                  }
                }
                break;
              }
            }
          }
          
          // Set the current line and highlight range
          setCurrentLineIndex(startLine);
          setHighlightedLines(inBlock ? {start: startLine, end: endLine} : null);
          
          // Scroll to the selected line
          scrollToLine(startLine);
        }
      }
    };
    
    // Helper to scroll to a specific line
    const scrollToLine = (lineIndex: number) => {
      const codeElement = document.querySelector('.code-overlay-code');
      const lineElements = codeElement?.querySelectorAll('.code-line');
      if (lineElements && lineElements[lineIndex]) {
        lineElements[lineIndex].scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    };
    
    return (
      <div className="side-panel-content files-panel">
        <div className="panel-header">
          <span className="material-icons">folder</span>
          <span className="panel-title">Explorer</span>
        </div>
        
        <div className="project-stats">
          <div className="project-info">
            <span className="project-name">{project}</span>
            <span className="file-count">{currentFileName}</span>
          </div>
        </div>
        
        <div className="folder-tree">
          <div className="workspace-section">
            <div className="section-title">CURRENT FILE</div>
            <div className="file active">
              {getFileIcon(currentFileName)}
              <span>{currentFileName}</span>
            </div>
          </div>
          
          <div className="workspace-section">
            <div className="section-title">CODE STRUCTURE</div>
            <div className="outline-section">
              {(() => {
                // Count models, tools, etc.
                const modelCount = codeLines.filter(line => 
                  line.match(/^\s*model\s+\w+\s*\{/)
                ).length;
                
                const toolCount = codeLines.filter(line => 
                  line.match(/^\s*tool\s+\w+\s*\{/)
                ).length;
                
                const hasWorkflow = codeLines.some(line => 
                  line.match(/^\s*magnetize\s*\{/)
                );

                const hasApp = codeLines.some(line => 
                  line.includes('glue app')
                );

                const hasConfig = codeLines.some(line => 
                  line.includes('config')
                );
                
                return (
                  <>
                    {hasApp && (
                      <div 
                        className={`outline-item ${clickedSection === 'glue app' ? 'clicked' : ''}`}
                        onClick={() => navigateToSection('glue app')}
                      >
                        <span className="material-icons" style={{color: '#34B8CE'}}>apps</span>
                        <span>App Configuration</span>
                      </div>
                    )}
                    {modelCount > 0 && (
                      <div 
                        className={`outline-item ${clickedSection === 'models-count' ? 'clicked' : ''}`}
                        onClick={() => {
                          // Highlight all model blocks
                          setClickedSection('models-count');
                          
                          // Clear existing highlights
                          setHighlightedLines(null);
                          
                          // Find all model blocks
                          const blocks: {start: number, end: number}[] = [];
                          const modelPattern = /^\s*model\s+\w+\s*\{/i;
                          
                          // Find the first model for initial scroll
                          const firstModelIndex = codeLines.findIndex(line => 
                            line.match(modelPattern)
                          );
                          
                          // Find all models
                          codeLines.forEach((line, index) => {
                            if (line.match(modelPattern)) {
                              // We found a model start
                              const startLine = index;
                              let endLine = index;
                              let bracketCount = 1; // Start with 1 for the opening bracket
                              
                              // Find the matching closing bracket
                              for (let i = index + 1; i < codeLines.length; i++) {
                                const currentLine = codeLines[i];
                                const openBrackets = (currentLine.match(/\{/g) || []).length;
                                const closeBrackets = (currentLine.match(/\}/g) || []).length;
                                
                                bracketCount += openBrackets - closeBrackets;
                                
                                if (bracketCount <= 0) {
                                  endLine = i;
                                  blocks.push({start: startLine, end: endLine});
                                  break;
                                }
                              }
                            }
                          });
                          
                          // If we found models, highlight them all and scroll to the first one
                          if (blocks.length > 0) {
                            // Create a merged highlight block from first to last
                            const allStart = Math.min(...blocks.map(b => b.start));
                            const allEnd = Math.max(...blocks.map(b => b.end));
                            setHighlightedLines({start: allStart, end: allEnd});
                            
                            // Scroll to the first occurrence
                            setCurrentLineIndex(firstModelIndex);
                            const codeElement = document.querySelector('.code-overlay-code');
                            const lineElements = codeElement?.querySelectorAll('.code-line');
                            if (lineElements && lineElements[firstModelIndex]) {
                              lineElements[firstModelIndex].scrollIntoView({ 
                                behavior: 'smooth', 
                                block: 'center' 
                              });
                            }
                          }
                          
                          // Reset clicked section after animation
                          setTimeout(() => setClickedSection(null), 500);
                        }}
                      >
                        <span className="material-icons" style={{color: '#50FA7B'}}>smart_toy</span>
                        <span>{modelCount} Model{modelCount !== 1 ? 's' : ''}</span>
                      </div>
                    )}
                    {toolCount > 0 && (
                      <div 
                        className={`outline-item ${clickedSection === 'tools-count' ? 'clicked' : ''}`}
                        onClick={() => {
                          // Highlight all tool blocks
                          setClickedSection('tools-count');
                          
                          // Clear existing highlights
                          setHighlightedLines(null);
                          
                          // Find all tool blocks
                          const blocks: {start: number, end: number}[] = [];
                          const toolPattern = /^\s*tool\s+\w+\s*\{/i;
                          
                          // Find the first tool for initial scroll
                          const firstToolIndex = codeLines.findIndex(line => 
                            line.match(toolPattern)
                          );
                          
                          // Find all tools
                          codeLines.forEach((line, index) => {
                            if (line.match(toolPattern)) {
                              // We found a tool start
                              const startLine = index;
                              let endLine = index;
                              let bracketCount = 1; // Start with 1 for the opening bracket
                              
                              // Find the matching closing bracket
                              for (let i = index + 1; i < codeLines.length; i++) {
                                const currentLine = codeLines[i];
                                const openBrackets = (currentLine.match(/\{/g) || []).length;
                                const closeBrackets = (currentLine.match(/\}/g) || []).length;
                                
                                bracketCount += openBrackets - closeBrackets;
                                
                                if (bracketCount <= 0) {
                                  endLine = i;
                                  blocks.push({start: startLine, end: endLine});
                                  break;
                                }
                              }
                            }
                          });
                          
                          // If we found tools, highlight them all and scroll to the first one
                          if (blocks.length > 0) {
                            // Create a merged highlight block from first to last
                            const allStart = Math.min(...blocks.map(b => b.start));
                            const allEnd = Math.max(...blocks.map(b => b.end));
                            setHighlightedLines({start: allStart, end: allEnd});
                            
                            // Scroll to the first occurrence
                            setCurrentLineIndex(firstToolIndex);
                            const codeElement = document.querySelector('.code-overlay-code');
                            const lineElements = codeElement?.querySelectorAll('.code-line');
                            if (lineElements && lineElements[firstToolIndex]) {
                              lineElements[firstToolIndex].scrollIntoView({ 
                                behavior: 'smooth', 
                                block: 'center' 
                              });
                            }
                          }
                          
                          // Reset clicked section after animation
                          setTimeout(() => setClickedSection(null), 500);
                        }}
                      >
                        <span className="material-icons" style={{color: '#8BE9FD'}}>build</span>
                        <span>{toolCount} Tool{toolCount !== 1 ? 's' : ''}</span>
                      </div>
                    )}
                    {hasWorkflow && (
                      <div 
                        className={`outline-item ${clickedSection === 'workflow-defined' ? 'clicked' : ''}`}
                        onClick={() => navigateToSection('magnetize')}
                      >
                        <span className="material-icons" style={{color: '#FFB86C'}}>account_tree</span>
                        <span>Workflow</span>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render the search panel
  const renderSearchPanel = () => {
    return (
      <div className="side-panel-content search-panel">
        <div className="panel-header">
          <span className="material-icons">search</span>
          <span className="panel-title">Search</span>
        </div>
        <div className="search-container">
          <div className="search-input-container">
            <input 
              type="text" 
              placeholder="Search in file..." 
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                searchInCode(e.target.value);
              }}
              className="search-input"
            />
          </div>
          <div className="search-results-info">
            {searchResults.length > 0 ? (
              <div className="search-stats">
                {currentSearchIndex + 1} of {searchResults.length} results
                <div className="search-navigation">
                  <button 
                    onClick={() => navigateSearch('prev')}
                    className="search-nav-btn" 
                    disabled={searchResults.length <= 1}
                  >
                    <span className="material-icons">keyboard_arrow_up</span>
                  </button>
                  <button 
                    onClick={() => navigateSearch('next')}
                    className="search-nav-btn"
                    disabled={searchResults.length <= 1}
                  >
                    <span className="material-icons">keyboard_arrow_down</span>
                  </button>
                </div>
              </div>
            ) : searchTerm ? (
              <div className="no-results">No results found</div>
            ) : null}
          </div>
          {searchResults.length > 0 && (
            <div className="search-result-list">
              {searchResults.map((lineIndex, i) => (
                <div 
                  key={i} 
                  className={`search-result-item ${currentSearchIndex === i ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentSearchIndex(i);
                    setCurrentLineIndex(lineIndex);
                  }}
                >
                  <div className="line-number">{lineIndex + 1}</div>
                  <div className="line-preview">
                    {codeLines[lineIndex].substring(0, 40)}
                    {codeLines[lineIndex].length > 40 ? '...' : ''}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`code-overlay ${isVisible ? 'visible' : ''}`} onClick={handleCodeAreaClick}>
      <div className="code-overlay-header">
        <div className="code-overlay-tabs">
          <div className="code-overlay-tab active">
            <span className="filetype-icon">{filename.endsWith('.glue') ? '{ }' : '< >'}</span>
            {filename}
          </div>
        </div>
        <div className="code-overlay-title">
          {title}
          <span className="code-overlay-filename" title={filename}>{filename}</span>
        </div>
        <div className="code-overlay-actions">
          <button className="code-overlay-btn copy-btn" onClick={copyCode}>
            <span>Copy</span>
          </button>
          {highlightedLines && (
            <button 
              className="code-overlay-btn exit-highlight-btn" 
              onClick={clearHighlightedBlock}
              title="Clear selection (ESC)"
            >
              <span>Exit Highlight</span>
            </button>
          )}
          <button className="code-overlay-btn download-btn" onClick={downloadCode}>
            <span>Download</span>
          </button>
          <button className="code-overlay-btn close-btn" onClick={onClose}>
            <span>Close</span>
          </button>
        </div>
      </div>
      <div className="code-overlay-content">
        <div className="code-overlay-sidebar">
          <div
            className={`sidebar-icon files ${activePanel === 'files' ? 'active' : ''}`}
            onClick={() => togglePanel('files')}
            title="Explorer"
          ></div>
          <div
            className={`sidebar-icon search ${activePanel === 'search' ? 'active' : ''}`}
            onClick={() => togglePanel('search')}
            title="Search"
          ></div>
        </div>
        
        <div className={`side-panel ${isMobileView ? (isMobilePanel ? 'active' : '') : ''}`}>
          {activePanel === 'files' && renderFilesPanel()}
          {activePanel === 'search' && renderSearchPanel()}
        </div>
        
        <div className="code-overlay-editor">
          <div className={`code-overlay-line-numbers ${isMobileView ? 'mobile-hidden' : ''}`}>
            {codeLines.map((_, index) => (
              <div
                key={index}
                className={currentLineIndex === index ? 'current-line' : ''}
                onMouseEnter={() => highlightLine(index)}
                onMouseLeave={clearLineHighlight}
              >
                {index + 1}
              </div>
            ))}
          </div>
          
          <div 
            className="code-overlay-code"
          >
            {processedCodeLines.map((line, lineIndex) => (
              <div 
                key={lineIndex}
                className={`code-line ${
                  currentLineIndex === lineIndex ? 'highlighted' : ''
                } ${
                  searchResults.includes(lineIndex) ? 'search-match' : ''
                } ${
                  highlightedLines && lineIndex >= highlightedLines.start && lineIndex <= highlightedLines.end ? 'block-highlighted' : ''
                }`}
                data-line-number={lineIndex + 1}
                onMouseEnter={() => highlightLine(lineIndex)}
                onMouseLeave={clearLineHighlight}
                onDoubleClick={highlightedLines ? clearHighlightedBlock : undefined}
              >
                <span dangerouslySetInnerHTML={{ __html: line }} />
              </div>
            ))}
          </div>
          
          {!isMobileView && (
            <div className="code-overlay-minimap">
              <div className="minimap-content" onClick={clearHighlightedBlock} title="Click to exit highlight mode">
                {renderMinimap()}
              </div>
              <div className="minimap-visible-area" style={{ top: `${(currentLineIndex || 0) * 100 / Math.max(codeLines.length, 1)}%` }}></div>
            </div>
          )}
        </div>
      </div>
      <div className="code-overlay-status-bar">
        <div className="status-bar-left">
          <div className="status-bar-item">
            <span className="material-icons" style={{ fontSize: '14px' }}>code</span>
            GLUE
          </div>
          <div className="status-bar-item">
            <span className="material-icons" style={{ fontSize: '14px' }}>text_format</span>
            UTF-8
          </div>
          {highlightedLines && (
            <div className="status-bar-item highlight-indicator">
              <span className="material-icons" style={{ fontSize: '14px', color: 'rgba(52, 184, 206, 1)' }}>format_paint</span>
              Highlight Mode (ESC to exit)
            </div>
          )}
        </div>
        <div className="status-bar-right">
          <div className="status-bar-item">
            <span className="material-icons" style={{ fontSize: '14px' }}>space_bar</span>
            Spaces: 2
          </div>
          <div className="status-bar-item">
            <span className="material-icons" style={{ fontSize: '14px' }}>keyboard_return</span>
            LF
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple syntax highlighting function
const formatCodeWithSyntaxHighlighting = (code: string): string => {
  // Preserve whitespace - particularly indentation
  const spaces = code.match(/^\s*/)?.[0] || '';
  const indentLevel = Math.floor(spaces.length / 2); // Assuming 2 spaces per indent level
  const spacesHtml = spaces.replace(/ /g, '&nbsp;');
  
  // Get the actual content after initial whitespace
  const content = code.trimStart();
  
  // If the line is just whitespace, return it as is
  if (!content) {
    return `<span style="--indent-level:${indentLevel};">${spacesHtml}</span>`;
  }
  
  // Escape HTML special characters to prevent XSS and rendering issues
  let formattedContent = content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  
  // Define GLUE language keywords with proper categorization
  const rootKeywords = ['glue', 'app', 'model', 'tool', 'magnetize'];
  const configKeywords = ['config', 'provider', 'role', 'adhesives'];
  const adhesiveTypes = ['glue', 'velcro', 'tape', 'staple'];
  const booleanValues = ['true', 'false'];
  
  // Apply syntax highlighting in the correct order to prevent overlap issues
  
  // 1. Highlight comments first (to avoid highlighting within comments)
  formattedContent = formattedContent.replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>');
  
  // 2. Highlight strings (to avoid highlighting keywords inside strings)
  formattedContent = formattedContent.replace(/("(?:[^"\\]|\\.)*")/g, '<span class="string">$1</span>');
  
  // 3. Process adhesives array first to prevent double highlighting
  // Match adhesive types specifically when they appear in arrays
  const adhesivesArrayRegex = /(\badhesives\s*=\s*\[)([^\]]+)(\])/g;
  formattedContent = formattedContent.replace(adhesivesArrayRegex, (match, before, content, after) => {
    // Split the content by commas and process each adhesive type
    const processedContent = content.split(',').map((item: string) => {
      const trimmed = item.trim();
      if (adhesiveTypes.includes(trimmed)) {
        return ` <span class="function">${trimmed}</span>`;
      }
      return item;
    }).join(',');
    
    return `${before}${processedContent}${after}`;
  });
  
  // 4. Highlight root keywords only when they're used as declarations
  // This prevents highlighting keywords that appear in adhesives arrays
  rootKeywords.forEach(keyword => {
    // Only match the keyword at the beginning of a line (after whitespace) or in specific contexts
    const regex = new RegExp(`(^|\\s+)(${keyword})\\s+(?=\\w+|{)(?![^<]*>)`, 'g');
    formattedContent = formattedContent.replace(regex, `$1<span class="keyword keyword-${keyword}">$2</span> `);
  });
  
  // 5. Highlight config keywords
  configKeywords.forEach(keyword => {
    const regex = new RegExp(`\\b(${keyword})\\b(?![^<]*>)`, 'g');
    formattedContent = formattedContent.replace(regex, '<span class="keyword keyword-config">$1</span>');
  });
  
  // 6. Highlight boolean values
  booleanValues.forEach(value => {
    const regex = new RegExp(`\\b(${value})\\b(?![^<]*>)`, 'g');
    formattedContent = formattedContent.replace(regex, '<span class="number">$1</span>');
  });
  
  // 7. Highlight numbers
  formattedContent = formattedContent.replace(/\b(\d+(\.\d+)?)(?![^<]*>)\b/g, '<span class="number">$1</span>');
  
  // 8. Highlight operators
  formattedContent = formattedContent.replace(/(\=|\->)(?![^<]*>)/g, '<span class="operator">$1</span>');
  
  // 9. Highlight brackets and braces
  formattedContent = formattedContent.replace(/(\{)(?![^<]*>)/g, '<span class="bracket block-start">$1</span>');
  formattedContent = formattedContent.replace(/(\})(?![^<]*>)/g, '<span class="bracket block-end">$1</span>');
  formattedContent = formattedContent.replace(/(\[|\])(?![^<]*>)/g, '<span class="bracket">$1</span>');
  
  // 10. Highlight properties (property names before equals sign)
  formattedContent = formattedContent.replace(/\b(\w+)(?=\s*=)(?![^<]*>)/g, '<span class="property">$1</span>');
  
  // Return the code with preserved indentation and indent level for guides
  return `<span style="--indent-level:${indentLevel};">${spacesHtml}${formattedContent}</span>`;
};

const Docs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedCode, setExpandedCode] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{[sectionId: string]: boolean}>({});
  const [codeOverlayVisible, setCodeOverlayVisible] = useState(false);
  const [currentOverlayCode, setCurrentOverlayCode] = useState('');
  const [currentOverlayTitle, setCurrentOverlayTitle] = useState('');
  const [currentCodeId, setCurrentCodeId] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<{[key: string]: HTMLElement | null}>({});

  // Code examples for the overlay
  const codeExamples: {[key: string]: {code: string, title: string, filename: string}} = {
    'research': {
      code: `glue app {
  name = "Research Assistant"
  config {
    development = true
    sticky = true
  }
}

tool web_search {
  provider = serp
}

tool file_handler {
  config {
    base_path = "./workspace"
  }
}

model researcher {
  provider = openrouter
  role = "Research topics online"
  adhesives = [glue, velcro]
  config {
    model = "meta-llama/llama-3.1-70b-instruct:free"
  }
}

model fact_checker {
  provider = anthropic
  role = "Verify factual accuracy"
  adhesives = [velcro]
  config {
    model = "claude-3-opus-20240229"
    temperature = 0.2
  }
}

magnetize {
  input -> researcher
  researcher -> web_search
  web_search -> fact_checker
  fact_checker -> output
}`,
      title: "Research Assistant Example",
      filename: "research-assistant.glue"
    },
    'code-gen': {
      code: `glue app {
  name = "Code Generator"
  config {
    development = true
  }
}

tool file_handler {
  config {
    base_path = "./project"
    permissions = "read-write"
  }
}

tool code_interpreter {}

model architect {
  provider = openrouter
  role = "Design software architecture"
  adhesives = [glue]
  config {
    model = "meta-llama/llama-3.1-70b-instruct:free"
  }
}

model coder {
  provider = anthropic
  role = "Generate implementation code"
  adhesives = [velcro, tape]
  config {
    model = "claude-3-opus-20240229"
  }
}

model tester {
  provider = openai
  role = "Write and run tests"
  adhesives = [velcro]
  config {
    model = "gpt-4"
    temperature = 0.3
  }
}

magnetize {
  input -> architect
  architect -> coder
  coder -> [file_handler, tester]
  tester -> code_interpreter -> output
}`,
      title: "Code Generator Example",
      filename: "code-generator.glue"
    },
    'content': {
      code: `glue app {
  name = "Content Pipeline"
  config {
    development = true
    sticky = true
  }
}

tool web_search {
  provider = tavily
}

tool cms_publisher {
  config {
    api_endpoint = "https://cms.example.com/api"
  }
}

model researcher {
  provider = openrouter
  role = "Research topics thoroughly"
  adhesives = [glue, velcro]
  config {
    model = "meta-llama/llama-3.1-70b-instruct:free"
  }
}

model writer {
  provider = anthropic
  role = "Create content drafts"
  adhesives = [velcro]
  config {
    model = "claude-3-opus-20240229"
    temperature = 0.7
  }
}

model editor {
  provider = openai
  role = "Edit and improve content"
  adhesives = [tape]
  config {
    model = "gpt-4"
    temperature = 0.4
  }
}

magnetize {
  input -> researcher
  researcher -> web_search
  [researcher, web_search] -> writer
  writer -> editor
  editor -> cms_publisher -> output
}`,
      title: "Content Pipeline Example",
      filename: "content-pipeline.glue"
    }
  };

  // Search content mapping - maps section IDs to their searchable content
  const searchableContent = {
    overview: {
      'what-is-glue': 'What is GLUE? GLUE provides a declarative syntax for connecting AI models, tools, and systems into cohesive applications.',
      'key-features': 'Key Features Declarative Syntax Model Orchestration Tool Integration Flexible Adhesives Development Mode',
      'getting-started': 'Getting Started Installation Guide Examples GLUE in action npm install @glue-ai/core',
    },
    'core-concepts': {
      'models': 'Models AI agents Provider OpenAI Anthropic Role Adhesives Config temperature max tokens',
      'tools': 'Tools web search file operations external APIs code execution',
      'adhesives': 'Adhesives Glue Velcro Tape Staple bidirectional communication context-aware connections memory data transfer',
      'workflows': 'Workflows magnetize block orchestrates models and tools information flow processing sequences dependencies error handling',
    },
    'syntax': {
      'basic-structure': 'Basic Structure glue app model tool magnetize',
      'defining-models': 'Defining Models provider role adhesives config model temperature max_tokens',
      'defining-tools': 'Defining Tools provider config api_key permissions',
      'workflow-orchestration': 'Workflow Orchestration input output connections',
    },
    'mcp': {
      'what-is-mcp': 'What is MCP? Model Control Protocol standardized interfaces controlling AI model execution monitoring performance safety',
      'configuration': 'Configuration MCP enabled endpoint auth features monitoring guardrails logging',
      'model-integration': 'Model Integration mcp_proxy target_provider openai content_safety pii_detection',
      'benefits': 'Benefits Standardized Control Enhanced Safety Monitoring Compliance data handling policies audit logs',
    },
    'installation': {
      'prerequisites': 'Prerequisites Node.js npm yarn API key',
      'npm-installation': 'NPM Installation create project directory initialize npm install',
      'configuration': 'Configuration .env file API keys OPENAI_API_KEY ANTHROPIC_API_KEY',
      'create-your-first-app': 'Create Your First App app.glue hello world',
      'running-your-app': 'Running Your App npx glue run glue dev',
    },
    'examples': {
      'research-assistant': 'Research Assistant multiple specialized research models automatic fact-checking verification documentation generation',
      'code-generator': 'Code Generator architecture design code generation testing quality assurance',
      'content-pipeline': 'Content Pipeline research content creation editing fact verification publishing',
    },
    'api': {
      'application-configuration': 'Application Configuration name development sticky debug log_level max_history mcp_enabled',
      'model-configuration': 'Model Configuration provider role adhesives model temperature max_tokens top_p top_k',
      'tool-configuration': 'Tool Configuration provider api_key endpoint max_results timeout',
      'workflow-configuration': 'Workflow Configuration flow definitions direct flow parallel flow join flow transformations conditions',
    },
  };

  const toggleCodeView = (codeId: string) => {
    // If there is a code example for this ID, show the overlay
    if (codeExamples[codeId]) {
      setCurrentOverlayCode(codeExamples[codeId].code);
      setCurrentOverlayTitle(codeExamples[codeId].title);
      setCurrentCodeId(codeId);
      setCodeOverlayVisible(true);
      
      // Prevent body scrolling when overlay is open
      document.body.style.overflow = 'hidden';
    } else {
      // Fallback to the old behavior if code example not found
    if (expandedCode === codeId) {
      setExpandedCode(null);
    } else {
      setExpandedCode(codeId);
        
        // Scroll to the code section with a slight delay to allow animation
        setTimeout(() => {
          const codeSection = document.querySelector(`.use-case-card.show-code .use-case-code`);
          if (codeSection) {
            codeSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 300);
      }
    }
  };

  // Close the code overlay
  const closeCodeOverlay = () => {
    setCodeOverlayVisible(false);
    setCurrentCodeId('');
    document.body.style.overflow = ''; // Restore scrolling
  };

  // Copy code functionality
  const copyToClipboard = (text: string, codeBlockId: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // Visual feedback for copy
      const copyButton = document.getElementById(`copy-btn-${codeBlockId}`);
      if (copyButton) {
        copyButton.classList.add('copied');
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
          copyButton.classList.remove('copied');
          copyButton.textContent = 'Copy';
        }, 2000);
      }
    });
  };

  // Handle tab changes and scroll to top
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setActiveSection(null);
    setSearchQuery('');
    setSearchResults({});
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
      window.scrollTo(0, 0);
    }
  };

  // Scroll to section function to replace anchor links
  const scrollToSection = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default anchor behavior
    
    const element = document.getElementById(sectionId);
    if (element) {
      // Set active section
      setActiveSection(sectionId);
      
      // Scroll to the section with smooth behavior
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Update URL without triggering navigation
      window.history.pushState(null, '', `#${sectionId}`);
    }
  };

  // Handle scroll to top button visibility and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);

      // Track which section is currently in view for the TOC highlighting
      const scrollPosition = window.scrollY + 200; // Offset for better UX

      // Find the current active section based on scroll position
      let currentSection = null;
      Object.entries(sectionRefs.current).forEach(([id, element]) => {
        if (element && element.offsetTop <= scrollPosition) {
          currentSection = id;
        }
      });

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // Initialize section refs when tab changes
  useEffect(() => {
    // Reset section refs when tab changes
    sectionRefs.current = {};
    
    // Collect references to all section headings
    document.querySelectorAll('.docs-section h2[id]').forEach((heading) => {
      const id = heading.getAttribute('id');
      if (id) {
        sectionRefs.current[id] = heading as HTMLElement;
      }
    });
    
    // Set initial active section
    const handleInitialScroll = () => {
      const scrollPosition = window.scrollY + 200;
      let initialSection = null;
      
      Object.entries(sectionRefs.current).forEach(([id, element]) => {
        if (element && element.offsetTop <= scrollPosition) {
          initialSection = id;
        }
      });
      
      setActiveSection(initialSection);
    };
    
    // Run after a slight delay to ensure DOM is updated
    setTimeout(handleInitialScroll, 100);

    // Handle URL hash on initial load
    const hash = window.location.hash.substring(1);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(hash);
        }, 300);
      }
    }
  }, [activeTab]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Get the current tab title for breadcrumbs
  const getCurrentTabTitle = () => {
    switch (activeTab) {
      case 'overview': return 'Overview';
      case 'core-concepts': return 'Core Concepts';
      case 'syntax': return 'GLUE Syntax';
      case 'mcp': return 'MCP Integration';
      case 'installation': return 'Installation';
      case 'examples': return 'Examples';
      case 'api': return 'API Reference';
      default: return 'Documentation';
    }
  };

  // Search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (!query.trim()) {
      setSearchResults({});
      return;
    }
    
    // Perform search on current tab content
    const results: {[sectionId: string]: boolean} = {};
    const currentTabContent = searchableContent[activeTab as keyof typeof searchableContent] || {};
    
    Object.entries(currentTabContent).forEach(([sectionId, content]) => {
      if (content.toLowerCase().includes(query.toLowerCase())) {
        results[sectionId] = true;
      }
    });
    
    setSearchResults(results);
  };

  // Highlight matched text in content
  const highlightText = (text: string): React.ReactNode => {
    if (!searchQuery.trim()) return text;
    
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
  return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === searchQuery.toLowerCase() 
            ? <span key={i} className="search-highlight">{part}</span> 
            : part
        )}
      </>
    );
  };

  // Check if a section should be visible based on search
  const isSectionVisible = (sectionId: string): boolean => {
    if (!searchQuery.trim()) return true;
    return Object.keys(searchResults).length === 0 || searchResults[sectionId];
  };

  // Table of contents for the current tab
  const renderTableOfContents = () => {
    if (activeTab === 'overview') {
      return (
        <div className="toc">
          <div className="toc-title">On this page</div>
          <ul className="toc-list">
            <li className={activeSection === 'what-is-glue' ? 'active' : ''}>
              <button 
                className="toc-link" 
                onClick={(e) => scrollToSection('what-is-glue', e)}
              >
                What is GLUE?
              </button>
            </li>
            <li className={activeSection === 'key-features' ? 'active' : ''}>
              <button 
                className="toc-link" 
                onClick={(e) => scrollToSection('key-features', e)}
              >
                Key Features
              </button>
            </li>
            <li className={activeSection === 'getting-started' ? 'active' : ''}>
              <button 
                className="toc-link" 
                onClick={(e) => scrollToSection('getting-started', e)}
              >
                Getting Started
              </button>
            </li>
          </ul>
        </div>
      );
    } else if (activeTab === 'core-concepts') {
      return (
        <div className="toc">
          <div className="toc-title">On this page</div>
          <ul className="toc-list">
            <li className={activeSection === 'models' ? 'active' : ''}>
              <button 
                className="toc-link" 
                onClick={(e) => scrollToSection('models', e)}
              >
                Models
              </button>
            </li>
            <li className={activeSection === 'tools' ? 'active' : ''}>
              <button 
                className="toc-link" 
                onClick={(e) => scrollToSection('tools', e)}
              >
                Tools
              </button>
            </li>
            <li className={activeSection === 'adhesives' ? 'active' : ''}>
              <button 
                className="toc-link" 
                onClick={(e) => scrollToSection('adhesives', e)}
              >
                Adhesives
              </button>
            </li>
            <li className={activeSection === 'workflows' ? 'active' : ''}>
              <button 
                className="toc-link" 
                onClick={(e) => scrollToSection('workflows', e)}
              >
                Workflows
              </button>
            </li>
          </ul>
        </div>
      );
    } else if (activeTab === 'syntax') {
      return (
        <div className="toc">
          <div className="toc-title">On this page</div>
          <ul className="toc-list">
            <li className={activeSection === 'basic-structure' ? 'active' : ''}>
              <button 
                className="toc-link" 
                onClick={(e) => scrollToSection('basic-structure', e)}
              >
                Basic Structure
              </button>
            </li>
            <li className={activeSection === 'defining-models' ? 'active' : ''}>
              <button 
                className="toc-link" 
                onClick={(e) => scrollToSection('defining-models', e)}
              >
                Defining Models
              </button>
            </li>
            <li className={activeSection === 'defining-tools' ? 'active' : ''}>
              <button 
                className="toc-link" 
                onClick={(e) => scrollToSection('defining-tools', e)}
              >
                Defining Tools
              </button>
            </li>
            <li className={activeSection === 'workflow-orchestration' ? 'active' : ''}>
              <button 
                className="toc-link" 
                onClick={(e) => scrollToSection('workflow-orchestration', e)}
              >
                Workflow Orchestration
              </button>
            </li>
          </ul>
        </div>
      );
    }
    
    return null;
  };

  // Render code blocks with copy button
  const renderCodeBlock = (code: string, id: string) => {
    return (
      <div className="code-block">
        <pre>
          <code>{code}</code>
        </pre>
        <button 
          id={`copy-btn-${id}`}
          className="copy-button" 
          onClick={() => copyToClipboard(code, id)}
        >
          Copy
        </button>
      </div>
    );
  };

  // Render info block component
  const InfoBlock = ({ type, title, children }: { type: 'note' | 'warning' | 'tip', title: string, children: React.ReactNode }) => (
    <div className={`info-block ${type}`}>
      <h4>{title}</h4>
      {children}
    </div>
  );

  // No results component
  const NoResults = () => (
    <div className="no-search-results">
      <div className="no-results-icon">search_off</div>
      <h3>No results found</h3>
      <p>Try different keywords or check your spelling</p>
      <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
        Clear search
      </button>
    </div>
  );

  return (
    <div className="docs-page">
    <div className="docs-container">
      <aside className="docs-sidebar">
        <nav>
          <h3>Documentation</h3>
          <ul>
            <li>
              <button 
                className={`sidebar-btn overview ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => handleTabChange('overview')}
              >
                Overview
              </button>
            </li>
            <li>
              <button 
                className={`sidebar-btn core-concepts ${activeTab === 'core-concepts' ? 'active' : ''}`}
                onClick={() => handleTabChange('core-concepts')}
              >
                Core Concepts
              </button>
            </li>
            <li>
              <button 
                className={`sidebar-btn syntax ${activeTab === 'syntax' ? 'active' : ''}`}
                onClick={() => handleTabChange('syntax')}
              >
                GLUE Syntax
              </button>
            </li>
            <li>
              <button 
                className={`sidebar-btn integration ${activeTab === 'mcp' ? 'active' : ''}`}
                onClick={() => handleTabChange('mcp')}
              >
                MCP Integration
              </button>
            </li>
            <li>
              <button 
                className={`sidebar-btn installation ${activeTab === 'installation' ? 'active' : ''}`}
                onClick={() => handleTabChange('installation')}
              >
                Installation
              </button>
            </li>
            <li>
              <button 
                className={`sidebar-btn examples ${activeTab === 'examples' ? 'active' : ''}`}
                onClick={() => handleTabChange('examples')}
              >
                Examples
              </button>
            </li>
            <li>
              <button 
                className={`sidebar-btn api ${activeTab === 'api' ? 'active' : ''}`}
                onClick={() => handleTabChange('api')}
              >
                API Reference
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      
        <main className="docs-content" ref={contentRef}>
          {/* Breadcrumb navigation */}
          <div className="page-header">
            <div className="breadcrumb">
              <span className="breadcrumb-item">Documentation</span>
              <span className="breadcrumb-current">{getCurrentTabTitle()}</span>
            </div>
          </div>

          {/* Search bar */}
          <div className="docs-search">
            <span className="search-icon"></span>
            <input
              type="text"
              className="search-input"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={handleSearch}
            />
            {searchQuery && (
              <button 
                className="clear-search" 
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                clear
              </button>
            )}
          </div>

          {/* Search stats */}
          {searchQuery && (
            <div className="search-stats">
              <span>
                {Object.keys(searchResults).length} result{Object.keys(searchResults).length !== 1 ? 's' : ''} found
              </span>
            </div>
          )}

          {/* Table of contents for the current section */}
          {!searchQuery && renderTableOfContents()}
          
          {/* Show no results message if search has no matches */}
          {searchQuery && Object.keys(searchResults).length === 0 && (
            <NoResults />
          )}
          
          {activeTab === 'overview' && (
            <section className="docs-section">
              <h1>GLUE Overview</h1>
              <p className="docs-lead">
                GLUE (Generative-AI Linking & Unification Engine) is a framework for building powerful AI applications through composable workflows.
              </p>
              
              {isSectionVisible('what-is-glue') && (
                <>
                  <InfoBlock type="note" title="Latest Version">
                    <p>GLUE 1.5 is now available with enhanced workflow controls and MCP integration.</p>
                  </InfoBlock>
                  
                  <h2 id="what-is-glue">What is GLUE?</h2>
                  <p>
                    {highlightText('GLUE provides a declarative syntax for connecting AI models, tools, and systems into cohesive applications. It allows developers to orchestrate complex workflows involving multiple models and tools without getting lost in implementation details.')}
                  </p>
                </>
              )}
              
              {isSectionVisible('key-features') && (
                <>
                  <h2 id="key-features">Key Features</h2>
                  <ul>
                    <li><strong>{highlightText('Declarative Syntax')}</strong> - Define your AI application architecture with a clean, readable syntax</li>
                    <li><strong>{highlightText('Model Orchestration')}</strong> - Connect multiple AI models with specialized roles</li>
                    <li><strong>{highlightText('Tool Integration')}</strong> - Seamlessly incorporate tools like web search, file operations, and more</li>
                    <li><strong>{highlightText('Flexible Adhesives')}</strong> - Define how models and tools communicate with configurable connection types</li>
                    <li><strong>{highlightText('Development Mode')}</strong> - Test and iterate quickly with built-in debugging features</li>
                  </ul>
                </>
              )}
              
              {isSectionVisible('getting-started') && (
                <>
                  <h2 id="getting-started">Getting Started</h2>
                  <p>
                    {highlightText('To start building with GLUE, see our')} <button onClick={() => handleTabChange('installation')} className="link-button">Installation Guide</button> {highlightText('or jump straight to')} <button onClick={() => handleTabChange('examples')} className="link-button">Examples</button> {highlightText('to see GLUE in action.')}
                  </p>
                  
                  <InfoBlock type="tip" title="Quick Start">
                    <p>Run <code>{highlightText('npm install @glue-ai/core')}</code> to get started with GLUE in your project.</p>
                  </InfoBlock>
                </>
              )}
            </section>
          )}

          {activeTab === 'core-concepts' && (
            <section className="docs-section">
              <h1>Core Concepts</h1>
              <p className="docs-lead">
                Understanding the fundamental building blocks of the GLUE framework.
              </p>
              
              {isSectionVisible('models') && (
                <>
                  <h2 id="models">Models</h2>
                  <p>
                    {highlightText('Models are the AI agents that power your GLUE applications. Each model can be configured with:')}
                  </p>
                  <ul>
                    <li><strong>{highlightText('Provider')}</strong> - The service providing the model (OpenAI, Anthropic, etc.)</li>
                    <li><strong>{highlightText('Role')}</strong> - A specific purpose or responsibility the model fulfills</li>
                    <li><strong>{highlightText('Adhesives')}</strong> - How this model connects to other components</li>
                    <li><strong>{highlightText('Config')}</strong> - Model-specific settings like temperature, max tokens, etc.</li>
                  </ul>
                  
                  {renderCodeBlock(`model researcher {
  provider = anthropic
  role = "Research topics thoroughly"
  adhesives = [glue, velcro]
  config {
    model = "claude-3-opus-20240229"
    temperature = 0.7
    max_tokens = 4000
  }
}`, "models-example")}
                </>
              )}
              
              {isSectionVisible('tools') && (
                <>
                  <h2 id="tools">Tools</h2>
                  <p>
                    {highlightText('Tools extend your application\'s capabilities beyond language processing, allowing models to:')}
                  </p>
                  <ul>
                    <li>{highlightText('Search the web for information')}</li>
                    <li>{highlightText('Manipulate files and data')}</li>
                    <li>{highlightText('Interact with external APIs')}</li>
                    <li>{highlightText('Execute code and process results')}</li>
                  </ul>
                  
                  <InfoBlock type="warning" title="Security Note">
                    <p>When configuring tools with API access, ensure you properly secure your credentials and follow security best practices.</p>
                  </InfoBlock>
                </>
              )}
              
              {isSectionVisible('adhesives') && (
                <>
                  <h2 id="adhesives">Adhesives</h2>
                  <p>
                    {highlightText('Adhesives define how components communicate and share information:')}
                  </p>
                  <ul>
                    <li><strong>{highlightText('Glue')}</strong> - Standard bidirectional communication</li>
                    <li><strong>{highlightText('Velcro')}</strong> - Context-aware connections with memory</li>
                    <li><strong>{highlightText('Tape')}</strong> - One-way data transfer with transformation</li>
                    <li><strong>{highlightText('Staple')}</strong> - Fixed, secure connections for critical data</li>
                  </ul>
                </>
              )}
              
              {isSectionVisible('workflows') && (
                <>
                  <h2 id="workflows">Workflows</h2>
                  <p>
                    {highlightText('The magnetize block orchestrates how models and tools work together, defining:')}
                  </p>
                  <ul>
                    <li>{highlightText('Information flow between components')}</li>
                    <li>{highlightText('Processing sequences and dependencies')}</li>
                    <li>{highlightText('Error handling and fallback strategies')}</li>
                    <li>{highlightText('Output formatting and delivery')}</li>
                  </ul>
                </>
              )}
            </section>
          )}

          {activeTab === 'syntax' && (
            <section className="docs-section">
              <h1>GLUE Syntax</h1>
              <p className="docs-lead">
                The GLUE language provides a declarative way to define AI applications.
              </p>
              
              <h2 id="basic-structure">Basic Structure</h2>
              {renderCodeBlock(`glue app {
    name = "Application Name"
    config {
        development = true|false
        sticky = true|false
    }
}

// Define components
model modelName { ... }
tool toolName { ... }

// Define workflow
magnetize { ... }`, "basic-structure")}
              
              <h2 id="defining-models">Defining Models</h2>
              {renderCodeBlock(`model researcher {
    provider = openrouter|anthropic|openai
    role = "Research topics online"
    adhesives = [glue, velcro]
    config {
        model = "model-name"
        temperature = 0.7
        max_tokens = 2000
    }
}`, "model-definition")}
              
              <h2 id="defining-tools">Defining Tools</h2>
              {renderCodeBlock(`tool web_search {
    provider = serp|tavily
    config {
        api_key = "key" // Environment variables recommended
        max_results = 5
    }
}

tool file_handler {
    config {
        base_path = "./workspace"
        permissions = "read-write"
    }
}`, "tool-definition")}
              
              <h2 id="workflow-orchestration">Workflow Orchestration</h2>
              {renderCodeBlock(`magnetize {
    input -> researcher
    researcher -> [web_search, code_interpreter]
    web_search -> fact_checker
    fact_checker -> output
}`, "workflow-definition")}
            </section>
          )}

          {activeTab === 'mcp' && (
            <section className="docs-section">
              <h1>MCP Integration</h1>
              <p className="docs-lead">
                Connecting GLUE with Model Control Protocol (MCP) for enhanced control and monitoring.
              </p>
              
              <h2>What is MCP?</h2>
              <p>
                Model Control Protocol provides standardized interfaces for controlling AI model execution, monitoring performance, and ensuring safety features are properly implemented across different providers.
              </p>
              
              <h2>Configuration</h2>
              <div className="code-block">
                <pre>
                  <code>
{`glue app {
    name = "MCP-Enabled App"
    config {
        development = true
        mcp_enabled = true
    }
}

mcp_controller {
    endpoint = "https://mcp-service.example.com"
    auth = "Bearer $MCP_API_KEY"
    features = ["monitoring", "guardrails", "logging"]
}`}
                  </code>
                </pre>
              </div>
              
              <h2>Model Integration</h2>
              <p>
                When MCP is enabled, models can be configured to use MCP for execution control:
              </p>
              <div className="code-block">
                <pre>
                  <code>
{`model assistant {
    provider = mcp_proxy
    target_provider = openai
    role = "Handle user requests"
    config {
        model = "gpt-4"
        guardrails = ["content_safety", "pii_detection"]
        monitoring = true
    }
}`}
                  </code>
                </pre>
              </div>
              
              <h2>Benefits</h2>
              <ul>
                <li><strong>Standardized Control</strong> - Consistent interfaces across providers</li>
                <li><strong>Enhanced Safety</strong> - Integrated guardrails and content filtering</li>
                <li><strong>Monitoring</strong> - Performance tracking and usage analytics</li>
                <li><strong>Compliance</strong> - Data handling policies and audit logs</li>
              </ul>
            </section>
          )}

          {activeTab === 'installation' && (
            <section className="docs-section">
              <h1>Installation Guide</h1>
              <p className="docs-lead">
                Getting started with GLUE is simple. Follow these steps to set up your development environment.
              </p>
              
              <h2>Prerequisites</h2>
              <ul>
                <li>Node.js 16.x or higher</li>
                <li>npm 7.x or higher or yarn 1.22.x or higher</li>
                <li>An API key for your preferred AI model provider(s)</li>
              </ul>
              
              <h2>NPM Installation</h2>
              <div className="code-block">
                <pre>
                  <code>
{`# Create a new project directory
mkdir my-glue-app
cd my-glue-app

# Initialize npm
npm init -y

# Install GLUE
npm install @glue-ai/core @glue-ai/cli`}
                  </code>
                </pre>
              </div>
              
              <h2>Configuration</h2>
              <p>
                Create a .env file in your project root to store your API keys and configuration:
              </p>
              <div className="code-block">
                <pre>
                  <code>
{`# .env
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
SERP_API_KEY=your_serp_key

# Optional configurations
GLUE_DEBUG=true
GLUE_LOG_LEVEL=info`}
                  </code>
                </pre>
              </div>
              
              <h2>Create Your First App</h2>
              <p>
                Create a file named app.glue in your project root:
              </p>
              <div className="code-block">
                <pre>
                  <code>
{`glue app {
    name = "Hello World"
    config {
        development = true
    }
}

model assistant {
    provider = openai
    role = "Assistant"
    config {
        model = "gpt-4"
    }
}

magnetize {
    input -> assistant -> output
}`}
                  </code>
                </pre>
              </div>
              
              <h2>Running Your App</h2>
              <div className="code-block">
                <pre>
                  <code>
{`# Using the CLI
npx glue run app.glue

# Or start in development mode with hot reloading
npx glue dev app.glue`}
                  </code>
                </pre>
              </div>
            </section>
          )}

        {activeTab === 'examples' && (
          <section className="docs-section">
            <h1>Examples & Use Cases</h1>
            <p className="docs-lead">
              Explore real-world examples of GLUE applications and how they solve different challenges.
            </p>
            
            <div className="use-case-grid">
              <div className={`use-case-card ${expandedCode === 'research' ? 'show-code' : ''}`}>
                <div className="use-case-preview">
                  <div className="use-case-preview-icon"></div>
                  <div className="use-case-preview-overlay"></div>
                </div>
                <div className="code-status status-basic">Example</div>
                <div className="use-case-header">
                  <h2>Research Assistant</h2>
                  <span className="use-case-tag">Research</span>
                </div>
                <div className="use-case-description">
                  <p>
                    Create a powerful research system with multiple specialized research models,
                    automatic fact-checking and verification, and documentation generation from research findings.
                  </p>
                  <ul className="use-case-features">
                    <li>Multiple specialized research models</li>
                    <li>Automatic fact-checking and verification</li>
                    <li>Documentation generation from findings</li>
                  </ul>
                  <div className="use-case-buttons">
                    <button 
                      className="view-code-btn"
                      onClick={() => toggleCodeView('research')}
                      aria-label="View Code"
                    >
                      View Code
                    </button>
                    <button 
                      className="view-demo-btn"
                      aria-label="See Demo"
                    >
                      See Demo
                    </button>
                  </div>
                </div>
              </div>

              <div className={`use-case-card ${expandedCode === 'code-gen' ? 'show-code' : ''}`}>
                <div className="use-case-preview">
                  <div className="use-case-preview-icon"></div>
                  <div className="use-case-preview-overlay"></div>
                </div>
                <div className="code-status status-basic">Example</div>
                <div className="use-case-header">
                  <h2>Code Generator</h2>
                  <span className="use-case-tag">Development</span>
                </div>
                <div className="use-case-description">
                  <p>
                    A multi-model system for software development that handles architecture design, 
                    code generation across multiple files, and testing with built-in quality assurance.
                  </p>
                  <ul className="use-case-features">
                    <li>Architecture design and planning</li>
                    <li>Multi-file code generation</li>
                    <li>Automated testing and validation</li>
                  </ul>
                  <div className="use-case-buttons">
                    <button 
                      className="view-code-btn"
                      onClick={() => toggleCodeView('code-gen')}
                      aria-label="View Code"
                    >
                      View Code
                    </button>
                    <button 
                      className="view-demo-btn"
                      aria-label="See Demo"
                    >
                      See Demo
                    </button>
                  </div>
                </div>
              </div>

              <div className={`use-case-card ${expandedCode === 'content' ? 'show-code' : ''}`}>
                <div className="use-case-preview">
                  <div className="use-case-preview-icon"></div>
                  <div className="use-case-preview-overlay"></div>
                </div>
                <div className="code-status status-basic">Example</div>
                <div className="use-case-header">
                  <h2>Content Pipeline</h2>
                  <span className="use-case-tag">Content</span>
                </div>
                <div className="use-case-description">
                  <p>
                    Create efficient content workflows with research, content creation, editing, 
                    fact verification, and publishing in a streamlined process.
                  </p>
                  <ul className="use-case-features">
                    <li>Research and initial drafting</li>
                    <li>Editorial review and improvement</li>
                    <li>Fact-checking and publishing</li>
                  </ul>
                  <div className="use-case-buttons">
                    <button 
                      className="view-code-btn"
                      onClick={() => toggleCodeView('content')}
                      aria-label="View Code"
                    >
                      View Code
                    </button>
                    <button 
                      className="view-demo-btn"
                      aria-label="See Demo"
                    >
                      See Demo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

          {activeTab === 'api' && (
            <section className="docs-section">
              <h1>API Reference</h1>
              <p className="docs-lead">
                Comprehensive reference for the GLUE API, including all available configuration options.
              </p>
              
              <h2>Application Configuration</h2>
                  <div className="code-block">
                    <pre>
                      <code>
{`glue app {
    name = string                  // Application name
    config {
        development = boolean      // Enable development mode
        sticky = boolean           // Persist state between runs
        debug = boolean            // Enable debug logging
        log_level = string         // "debug" | "info" | "warn" | "error"
        max_history = number       // Max conversation turns to retain
        mcp_enabled = boolean      // Enable MCP integration
    }
}`}
                  </code>
                </pre>
              </div>
              
              <h2>Model Configuration</h2>
              <div className="code-block">
                <pre>
                  <code>
{`model name {
    provider = string             // Model provider
    role = string                 // Description of model's purpose
    adhesives = [string]          // Array of connection types
    config {
        model = string            // Specific model to use
        temperature = number      // 0.0 to 1.0
        max_tokens = number       // Maximum response length
        top_p = number            // 0.0 to 1.0
        top_k = number            // Integer value
        presence_penalty = number // -2.0 to 2.0
        frequency_penalty = number // -2.0 to 2.0
        stop = [string]           // Array of stop sequences
    }
}`}
                  </code>
                </pre>
              </div>
              
              <h2>Tool Configuration</h2>
              <div className="code-block">
                <pre>
                  <code>
{`tool name {
    provider = string              // Tool provider if applicable
    config {
        // Provider-specific configuration
        // Examples:
        api_key = string
        endpoint = string
        max_results = number
        timeout = number
    }
}`}
                      </code>
                    </pre>
                  </div>
              
              <h2>Workflow Configuration</h2>
              <div className="code-block">
                <pre>
                  <code>
{`magnetize {
    // Flow definitions
    component1 -> component2      // Direct flow
    component1 -> [comp2, comp3]  // Parallel flow
    [comp1, comp2] -> component3  // Join flow
    
    // With transformations
    component1 -> { extract_data } -> component2
    
    // With conditions
    component1 -> if(condition) -> component2 : component3
}`}
                  </code>
                </pre>
            </div>
          </section>
        )}
      </main>
      </div>

      {/* Scroll to top button */}
      <button 
        className={`scroll-top ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <span style={{ fontFamily: 'Material Icons', fontSize: '1.5rem' }}>arrow_upward</span>
      </button>
      
      {/* Code Overlay */}
      <CodeOverlay 
        isVisible={codeOverlayVisible}
        code={currentOverlayCode}
        title={currentOverlayTitle}
        filename={codeExamples[currentCodeId]?.filename || 'code.glue'}
        onClose={closeCodeOverlay}
      />
    </div>
  );
};

export default Docs;
