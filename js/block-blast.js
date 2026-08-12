/**
 * Block Blast Game for Viona Website
 * Styled for Blue & White Premium theme.
 */

class BlockBlastGame {
  constructor() {
    this.boardSize = 8;
    this.grid = Array(this.boardSize).fill(null).map(() => Array(this.boardSize).fill(null));
    this.score = 0;
    this.highScore = parseInt(localStorage.getItem('blockblast_high_score') || '0', 10);
    this.pendingShapes = [null, null, null];
    this.selectedShapeIndex = null;
    
    // Audio Context for synthetic sounds
    this.audioCtx = null;

    // DOM Elements
    this.boardEl = null;
    this.slotsEl = null;
    this.scoreEl = null;
    this.highScoreEl = null;
    this.gameOverEl = null;
    this.finalScoreEl = null;
    this.restartBtns = null;
    this.deselectBtn = null;

    // Defined Shapes Database
    this.shapesDatabase = [
      { matrix: [[1]], color: 'from-cyan-400 to-cyan-500 border-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.4)]', name: '1x1' },
      { matrix: [[1, 1]], color: 'from-blue-400 to-blue-500 border-blue-300 shadow-[0_0_8px_rgba(96,165,250,0.4)]', name: '2x1' },
      { matrix: [[1], [1]], color: 'from-blue-400 to-blue-500 border-blue-300 shadow-[0_0_8px_rgba(96,165,250,0.4)]', name: '1x2' },
      { matrix: [[1, 1, 1]], color: 'from-indigo-400 to-indigo-500 border-indigo-300 shadow-[0_0_8px_rgba(129,140,248,0.4)]', name: '3x1' },
      { matrix: [[1], [1], [1]], color: 'from-indigo-400 to-indigo-500 border-indigo-300 shadow-[0_0_8px_rgba(129,140,248,0.4)]', name: '1x3' },
      { matrix: [[1, 1, 1, 1]], color: 'from-violet-400 to-violet-500 border-violet-300 shadow-[0_0_8px_rgba(167,139,250,0.4)]', name: '4x1' },
      { matrix: [[1], [1], [1], [1]], color: 'from-violet-400 to-violet-500 border-violet-300 shadow-[0_0_8px_rgba(167,139,250,0.4)]', name: '1x4' },
      { matrix: [[1, 1], [1, 1]], color: 'from-emerald-400 to-emerald-500 border-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.4)]', name: '2x2' },
      { matrix: [[1, 0], [1, 1]], color: 'from-amber-400 to-amber-500 border-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.4)]', name: 'L2x2-1' },
      { matrix: [[0, 1], [1, 1]], color: 'from-amber-400 to-amber-500 border-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.4)]', name: 'L2x2-2' },
      { matrix: [[1, 1], [1, 0]], color: 'from-amber-400 to-amber-500 border-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.4)]', name: 'L2x2-3' },
      { matrix: [[1, 1], [0, 1]], color: 'from-amber-400 to-amber-500 border-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.4)]', name: 'L2x2-4' },
      { matrix: [[1, 0, 0], [1, 0, 0], [1, 1, 1]], color: 'from-orange-400 to-orange-500 border-orange-300 shadow-[0_0_8px_rgba(251,146,60,0.4)]', name: 'L3x3-1' },
      { matrix: [[0, 0, 1], [0, 0, 1], [1, 1, 1]], color: 'from-orange-400 to-orange-500 border-orange-300 shadow-[0_0_8px_rgba(251,146,60,0.4)]', name: 'L3x3-2' },
      { matrix: [[1, 1, 1], [1, 0, 0], [1, 0, 0]], color: 'from-orange-400 to-orange-500 border-orange-300 shadow-[0_0_8px_rgba(251,146,60,0.4)]', name: 'L3x3-3' },
      { matrix: [[1, 1, 1], [0, 0, 1], [0, 0, 1]], color: 'from-orange-400 to-orange-500 border-orange-300 shadow-[0_0_8px_rgba(251,146,60,0.4)]', name: 'L3x3-4' },
      { matrix: [[1, 1, 1], [0, 1, 0]], color: 'from-rose-400 to-rose-500 border-rose-300 shadow-[0_0_8px_rgba(251,113,133,0.4)]', name: 'T3x2' },
      { matrix: [[0, 1, 0], [1, 1, 1]], color: 'from-rose-400 to-rose-500 border-rose-300 shadow-[0_0_8px_rgba(251,113,133,0.4)]', name: 'T3x2-inv' }
    ];
  }

  init() {
    this.boardEl = document.getElementById('bb-board');
    this.slotsEl = document.getElementById('bb-slots');
    this.scoreEl = document.getElementById('bb-score');
    this.highScoreEl = document.getElementById('bb-high-score');
    this.gameOverEl = document.getElementById('bb-game-over');
    this.finalScoreEl = document.getElementById('bb-final-score');
    this.restartBtns = document.querySelectorAll('.bb-restart-btn');
    this.deselectBtn = document.getElementById('bb-deselect-btn');

    if (!this.boardEl || !this.slotsEl) return;

    this.highScoreEl.textContent = this.highScore;
    
    // Bind Event Listeners
    this.restartBtns.forEach(btn => btn.addEventListener('click', () => this.restartGame()));
    if (this.deselectBtn) {
      this.deselectBtn.addEventListener('click', () => this.deselectShape());
    }

    // Build the grid interface
    this.buildBoardUI();
    this.restartGame();
  }

  // Synth sounds using Web Audio API
  playSound(type) {
    try {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const osc = this.audioCtx.createOscillator();
      const gainNode = this.audioCtx.createGain();
      osc.connect(gainNode);
      gainNode.connect(this.audioCtx.destination);

      const now = this.audioCtx.currentTime;

      if (type === 'select') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
        gainNode.gain.setValueAtTime(0.08, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'place') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.setValueAtTime(350, now + 0.05);
        gainNode.gain.setValueAtTime(0.12, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'clear') {
        // High rising retro chime
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(1000, now + 0.25);
        gainNode.gain.setValueAtTime(0.15, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'invalid') {
        // Flat buzz
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(130, now);
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'gameover') {
        // Descending low sweep
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.linearRampToValueAtTime(80, now + 0.6);
        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
        osc.start(now);
        osc.stop(now + 0.6);
      }
    } catch (e) {
      console.warn("Web Audio failed or blocked", e);
    }
  }

  buildBoardUI() {
    this.boardEl.innerHTML = '';
    for (let r = 0; r < this.boardSize; r++) {
      for (let c = 0; c < this.boardSize; c++) {
        const cell = document.createElement('div');
        cell.className = 'bb-cell aspect-square bg-slate-800/35 border border-slate-700/25 rounded-lg transition-all duration-150 cursor-pointer flex items-center justify-center';
        cell.dataset.row = r;
        cell.dataset.col = c;
        
        // Listeners for click, touch, and hover
        cell.addEventListener('mouseenter', () => this.handleCellHover(r, c));
        cell.addEventListener('mouseleave', () => this.clearPreview());
        cell.addEventListener('click', () => this.handleCellClick(r, c));
        
        this.boardEl.appendChild(cell);
      }
    }
    
    // Clear preview when mouse leaves the board area
    this.boardEl.addEventListener('mouseleave', () => this.clearPreview());
  }

  restartGame() {
    this.grid = Array(this.boardSize).fill(null).map(() => Array(this.boardSize).fill(null));
    this.score = 0;
    this.selectedShapeIndex = null;
    this.updateScoreDisplay();
    this.gameOverEl.classList.add('hidden');
    if (this.deselectBtn) {
      this.deselectBtn.classList.add('invisible');
    }
    
    this.updateBoardUI();
    this.generateNewShapes();
  }

  updateScoreDisplay() {
    this.scoreEl.textContent = this.score;
    if (this.score > this.highScore) {
      this.highScore = this.score;
      this.highScoreEl.textContent = this.highScore;
      localStorage.setItem('blockblast_high_score', this.highScore);
    }
  }

  generateNewShapes() {
    this.pendingShapes = [];
    for (let i = 0; i < 3; i++) {
      const randomIdx = Math.floor(Math.random() * this.shapesDatabase.length);
      this.pendingShapes.push(JSON.parse(JSON.stringify(this.shapesDatabase[randomIdx])));
    }
    this.renderPendingShapes();
    this.checkGameOver();
  }

  renderPendingShapes() {
    this.slotsEl.innerHTML = '';
    this.pendingShapes.forEach((shape, index) => {
      const slot = document.createElement('div');
      slot.className = `bb-slot flex items-center justify-center p-4 border border-slate-200 bg-slate-50/70 rounded-2xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all aspect-square min-h-[90px] ${shape === null ? 'opacity-35 pointer-events-none' : ''}`;
      slot.dataset.index = index;

      if (shape !== null) {
        // Draw the shape as a mini-grid
        const rows = shape.matrix.length;
        const cols = shape.matrix[0].length;
        const shapeGrid = document.createElement('div');
        shapeGrid.className = 'grid gap-[2px]';
        shapeGrid.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;
        
        // Scale block cells so they fit neatly in slot
        const blockSizeClass = 'w-4 h-4 sm:w-5 sm:h-5';

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            if (shape.matrix[r][c] === 1) {
              cell.className = `${blockSizeClass} rounded-[4px] bg-gradient-to-br ${shape.color}`;
            } else {
              cell.className = `${blockSizeClass} bg-transparent`;
            }
            shapeGrid.appendChild(cell);
          }
        }
        slot.appendChild(shapeGrid);
        
        // Selection Handler
        slot.addEventListener('click', () => this.selectShape(index));
      } else {
        slot.innerHTML = '<span class="text-slate-400 text-xs font-semibold">Kosong</span>';
      }

      this.slotsEl.appendChild(slot);
    });
  }

  selectShape(index) {
    if (this.pendingShapes[index] === null) return;
    
    this.playSound('select');
    
    if (this.selectedShapeIndex === index) {
      this.deselectShape();
      return;
    }

    this.selectedShapeIndex = index;
    if (this.deselectBtn) {
      this.deselectBtn.classList.remove('invisible');
    }

    // Update styling for selected slot
    const slots = this.slotsEl.querySelectorAll('.bb-slot');
    slots.forEach((slot, idx) => {
      if (idx === index) {
        slot.className = 'bb-slot flex items-center justify-center p-4 border-2 border-blue-600 bg-blue-50/40 rounded-2xl cursor-pointer ring-4 ring-blue-500/20 scale-105 transition-all aspect-square min-h-[90px]';
      } else {
        slot.className = `bb-slot flex items-center justify-center p-4 border border-slate-200 bg-slate-50/70 rounded-2xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all aspect-square min-h-[90px] ${this.pendingShapes[idx] === null ? 'opacity-35 pointer-events-none' : ''}`;
      }
    });

    this.clearPreview();
  }

  deselectShape() {
    this.selectedShapeIndex = null;
    if (this.deselectBtn) {
      this.deselectBtn.classList.add('invisible');
    }
    this.clearPreview();
    
    // Reset slot styling
    const slots = this.slotsEl.querySelectorAll('.bb-slot');
    slots.forEach((slot, idx) => {
      slot.className = `bb-slot flex items-center justify-center p-4 border border-slate-200 bg-slate-50/70 rounded-2xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all aspect-square min-h-[90px] ${this.pendingShapes[idx] === null ? 'opacity-35 pointer-events-none' : ''}`;
    });
  }

  // Returns list of cell coordinates affected by shape anchored at (r, c)
  getPlacementCells(shapeMatrix, startR, startC) {
    const cells = [];
    const rows = shapeMatrix.length;
    const cols = shapeMatrix[0].length;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (shapeMatrix[r][c] === 1) {
          cells.push({ r: startR + r, c: startC + c });
        }
      }
    }
    return cells;
  }

  // Validates if shape placement is within bounds and doesn't overlap
  isValidPlacement(cells) {
    for (let i = 0; i < cells.length; i++) {
      const { r, c } = cells[i];
      if (r < 0 || r >= this.boardSize || c < 0 || c >= this.boardSize) {
        return false;
      }
      if (this.grid[r][c] !== null) {
        return false;
      }
    }
    return true;
  }

  handleCellHover(r, c) {
    if (this.selectedShapeIndex === null) return;
    
    const shape = this.pendingShapes[this.selectedShapeIndex];
    const targetCells = this.getPlacementCells(shape.matrix, r, c);
    const isValid = this.isValidPlacement(targetCells);
    
    this.clearPreview();
    
    targetCells.forEach(cell => {
      // Only paint if the cell is inside board bounds
      if (cell.r >= 0 && cell.r < this.boardSize && cell.c >= 0 && cell.c < this.boardSize) {
        const cellEl = this.boardEl.querySelector(`[data-row="${cell.r}"][data-col="${cell.c}"]`);
        if (cellEl) {
          if (isValid) {
            cellEl.classList.add('bg-blue-500/35', 'border-blue-400/80', 'scale-95');
          } else {
            // Overlapping or invalid cells get red/rose warning indicator
            cellEl.classList.add('bg-rose-500/25', 'border-rose-400/80');
          }
        }
      }
    });
  }

  clearPreview() {
    const cells = this.boardEl.querySelectorAll('.bb-cell');
    cells.forEach(cellEl => {
      cellEl.classList.remove('bg-blue-500/35', 'border-blue-400/80', 'scale-95', 'bg-rose-500/25', 'border-rose-400/80');
    });
  }

  handleCellClick(r, c) {
    if (this.selectedShapeIndex === null) return;

    const shape = this.pendingShapes[this.selectedShapeIndex];
    const targetCells = this.getPlacementCells(shape.matrix, r, c);

    if (this.isValidPlacement(targetCells)) {
      // Place the shape
      targetCells.forEach(cell => {
        this.grid[cell.r][cell.c] = shape.color;
      });

      this.playSound('place');
      
      // Calculate score for placing blocks
      const placedCount = targetCells.length;
      this.score += placedCount * 10;
      
      this.pendingShapes[this.selectedShapeIndex] = null;
      this.selectedShapeIndex = null;
      if (this.deselectBtn) {
        this.deselectBtn.classList.add('invisible');
      }

      this.clearPreview();
      this.updateBoardUI();
      this.renderPendingShapes();

      // Check for row/column clears
      this.checkAndClearLines();

      // Check if all shapes placed
      if (this.pendingShapes.every(s => s === null)) {
        this.generateNewShapes();
      } else {
        this.checkGameOver();
      }
    } else {
      // Shake board or play error sound
      this.playSound('invalid');
      this.boardEl.classList.add('animate-shake');
      setTimeout(() => {
        this.boardEl.classList.remove('animate-shake');
      }, 350);
    }
  }

  checkAndClearLines() {
    const rowsToClear = [];
    const colsToClear = [];

    // Check Rows
    for (let r = 0; r < this.boardSize; r++) {
      if (this.grid[r].every(cell => cell !== null)) {
        rowsToClear.push(r);
      }
    }

    // Check Columns
    for (let c = 0; c < this.boardSize; c++) {
      let isColFull = true;
      for (let r = 0; r < this.boardSize; r++) {
        if (this.grid[r][c] === null) {
          isColFull = false;
          break;
        }
      }
      if (isColFull) {
        colsToClear.push(c);
      }
    }

    const totalLines = rowsToClear.length + colsToClear.length;
    if (totalLines > 0) {
      // Collect unique cells to clear
      const cellsToAnimate = new Set();
      
      rowsToClear.forEach(r => {
        for (let c = 0; c < this.boardSize; c++) {
          cellsToAnimate.add(`${r},${c}`);
        }
      });

      colsToClear.forEach(c => {
        for (let r = 0; r < this.boardSize; r++) {
          cellsToAnimate.add(`${r},${c}`);
        }
      });

      // Animate cleared cells
      cellsToAnimate.forEach(coordStr => {
        const [r, c] = coordStr.split(',').map(Number);
        const cellEl = this.boardEl.querySelector(`[data-row="${r}"][data-col="${c}"]`);
        if (cellEl) {
          // Remove color classes and add flash/blast classes
          cellEl.className = 'bb-cell aspect-square bg-white shadow-[0_0_20px_rgba(255,255,255,1)] border-white scale-110 rounded-lg transition-all duration-300 z-10';
        }
      });

      this.playSound('clear');

      // Delay actual clearing to let animation play
      setTimeout(() => {
        rowsToClear.forEach(r => {
          for (let c = 0; c < this.boardSize; c++) {
            this.grid[r][c] = null;
          }
        });

        colsToClear.forEach(c => {
          for (let r = 0; r < this.boardSize; r++) {
            this.grid[r][c] = null;
          }
        });

        // Award Combo Points
        // 1 line = 100, 2 lines = 300, 3 lines = 600, 4 lines = 1000, etc.
        const comboBonus = (totalLines * (totalLines + 1)) * 50;
        this.score += comboBonus;

        this.updateScoreDisplay();
        this.updateBoardUI();

        // Check game over again after grid space is opened
        this.checkGameOver();
      }, 300);
    }
  }

  updateBoardUI() {
    for (let r = 0; r < this.boardSize; r++) {
      for (let c = 0; c < this.boardSize; c++) {
        const cellEl = this.boardEl.querySelector(`[data-row="${r}"][data-col="${c}"]`);
        if (cellEl) {
          const colorClass = this.grid[r][c];
          if (colorClass) {
            cellEl.className = `bb-cell aspect-square bg-gradient-to-br ${colorClass} rounded-lg hover:brightness-110 active:scale-95 transition-all duration-150 cursor-pointer flex items-center justify-center border`;
          } else {
            cellEl.className = 'bb-cell aspect-square bg-slate-800/35 border border-slate-700/25 rounded-lg hover:bg-slate-700/40 hover:scale-[1.02] active:scale-95 transition-all duration-150 cursor-pointer flex items-center justify-center';
          }
        }
      }
    }
  }

  // Scan grid to see if any available shape can be placed
  canAnyShapeFit() {
    for (let index = 0; index < this.pendingShapes.length; index++) {
      const shape = this.pendingShapes[index];
      if (shape === null) continue;

      // Scan all possible board coordinates
      for (let r = 0; r < this.boardSize; r++) {
        for (let c = 0; c < this.boardSize; c++) {
          const targetCells = this.getPlacementCells(shape.matrix, r, c);
          if (this.isValidPlacement(targetCells)) {
            return true; // Found at least one valid spot
          }
        }
      }
    }
    return false;
  }

  checkGameOver() {
    // If there are pending shapes, check if at least one can fit.
    const activeShapes = this.pendingShapes.filter(s => s !== null);
    if (activeShapes.length > 0 && !this.canAnyShapeFit()) {
      this.playSound('gameover');
      this.finalScoreEl.textContent = this.score;
      this.gameOverEl.classList.remove('hidden');
    }
  }
}

// Instantiate and initialize the game when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
  const game = new BlockBlastGame();
  game.init();
});
