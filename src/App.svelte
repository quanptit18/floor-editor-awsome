<script lang="ts">
  import './app.css';
  import {onMount} from 'svelte';
  import {createDefaultProject, currentProject, viewMode} from '$lib/stores/project';
  import {localStore} from '$lib/services/datastore';
  import TopBar from "$lib/components/toolbar/TopBar.svelte";
  import BuildPanel from '$lib/components/sidebar/BuildPanel.svelte';
  import PropertiesPanel from '$lib/components/sidebar/PropertiesPanel.svelte';
  import LayersPanel from '$lib/components/sidebar/LayersPanel.svelte';
  import FloorPlanCanvas from '$lib/components/editor/FloorPlanCanvas.svelte';
  import AlignmentToolbar from '$lib/components/editor/AlignmentToolbar.svelte';
  import UndoHistoryPanel from '$lib/components/editor/UndoHistoryPanel.svelte';
  import CommandPalette from '$lib/components/editor/CommandPalette.svelte';
  import PrintLayout from '$lib/components/editor/PrintLayout.svelte';
  import OnboardingTooltip from '$lib/components/OnboardingTooltip.svelte';
  
  let showLayers = $state(false);
  
  let { stores, onDispatch } = $props()
  
  // Subscribe store
  let floorData = $state(null)
  let config = $state({ viewOnly: false });
  
  stores?.floorData.subscribe(v => floorData = v)
  stores?.config.subscribe(v => config = v)
  
  
  let commandPaletteOpen = $state(false);
  let printOpen = $state(false);
  
  let mode = $state<'2d' | '3d'>('2d');
  let ready = $state(false);
  let showHelp = $state(false);
  let showUndoHistory = $state(false);
  
  viewMode.subscribe((m) => {
    mode = m;
  });
  
  $effect(() => {
    const project = {
      "id": "0retn2ek",
      "name": "L-Shaped House",
      "floors": [
        {
          "id": "1fg6pga0",
          "name": "Ground Floor",
          "level": 0,
          "walls": [
            {
              "id": "lg5h806h",
              "start": {
                "x": 0,
                "y": 0
              },
              "end": {
                "x": 1400,
                "y": 0
              },
              "thickness": 15,
              "height": 280,
              "color": "#444444"
            },
            {
              "id": "whcf9cv2",
              "start": {
                "x": 1400,
                "y": 0
              },
              "end": {
                "x": 1400,
                "y": 600
              },
              "thickness": 15,
              "height": 280,
              "color": "#444444"
            },
            {
              "id": "phvbebmu",
              "start": {
                "x": 1400,
                "y": 600
              },
              "end": {
                "x": 600,
                "y": 600
              },
              "thickness": 15,
              "height": 280,
              "color": "#444444"
            },
            {
              "id": "xaxhdtmi",
              "start": {
                "x": 600,
                "y": 600
              },
              "end": {
                "x": 600,
                "y": 1100
              },
              "thickness": 15,
              "height": 280,
              "color": "#444444"
            },
            {
              "id": "cs1poy28",
              "start": {
                "x": 600,
                "y": 1100
              },
              "end": {
                "x": 0,
                "y": 1100
              },
              "thickness": 15,
              "height": 280,
              "color": "#444444"
            },
            {
              "id": "irjmbyqg",
              "start": {
                "x": 0,
                "y": 1100
              },
              "end": {
                "x": 0,
                "y": 0
              },
              "thickness": 15,
              "height": 280,
              "color": "#444444"
            },
            {
              "id": "n45rb09q",
              "start": {
                "x": 350,
                "y": 600
              },
              "end": {
                "x": 350,
                "y": 1100
              },
              "thickness": 15,
              "height": 280,
              "color": "#444444"
            },
            {
              "id": "mrcejzip",
              "start": {
                "x": 0,
                "y": 600
              },
              "end": {
                "x": 350,
                "y": 600
              },
              "thickness": 15,
              "height": 280,
              "color": "#444444"
            },
            {
              "id": "s0j86ogg",
              "start": {
                "x": 400,
                "y": 0
              },
              "end": {
                "x": 400,
                "y": 350
              },
              "thickness": 15,
              "height": 280,
              "color": "#444444"
            },
            {
              "id": "9779xycw",
              "start": {
                "x": 0,
                "y": 350
              },
              "end": {
                "x": 400,
                "y": 350
              },
              "thickness": 15,
              "height": 280,
              "color": "#444444"
            },
            {
              "id": "epl8xjo0",
              "start": {
                "x": 800,
                "y": 0
              },
              "end": {
                "x": 800,
                "y": 350
              },
              "thickness": 15,
              "height": 280,
              "color": "#444444"
            },
            {
              "id": "pw24r5jz",
              "start": {
                "x": 400,
                "y": 350
              },
              "end": {
                "x": 800,
                "y": 350
              },
              "thickness": 15,
              "height": 280,
              "color": "#444444"
            },
            {
              "id": "xvghl92m",
              "start": {
                "x": 800,
                "y": 350
              },
              "end": {
                "x": 1400,
                "y": 350
              },
              "thickness": 15,
              "height": 280,
              "color": "#444444"
            },
            {
              "id": "j5kb9mas",
              "start": {
                "x": 200,
                "y": 350
              },
              "end": {
                "x": 200,
                "y": 600
              },
              "thickness": 15,
              "height": 280,
              "color": "#444444"
            },
            {
              "id": "lryeizdx",
              "start": {
                "x": 0,
                "y": 600
              },
              "end": {
                "x": 200,
                "y": 600
              },
              "thickness": 15,
              "height": 280,
              "color": "#444444"
            },
            {
              "id": "zp1xe5hf",
              "start": {
                "x": 1000,
                "y": 350
              },
              "end": {
                "x": 1000,
                "y": 600
              },
              "thickness": 15,
              "height": 280,
              "color": "#444444"
            },
            {
              "id": "2cvf9bma",
              "start": {
                "x": 200,
                "y": 350
              },
              "end": {
                "x": 200,
                "y": 600
              },
              "thickness": 15,
              "height": 280,
              "color": "#444444"
            }
          ],
          "rooms": [
            {
              "id": "room-1-1776067835920",
              "name": "Room 1",
              "walls": [
                "lg5h806h",
                "whcf9cv2",
                "phvbebmu",
                "xaxhdtmi",
                "cs1poy28",
                "irjmbyqg"
              ],
              "floorTexture": "hardwood",
              "area": 114
            },
            {
              "id": "room-6-1776067835920",
              "name": "Room 6",
              "walls": [
                "phvbebmu",
                "zp1xe5hf",
                "xvghl92m",
                "pw24r5jz",
                "9779xycw",
                "j5kb9mas",
                "mrcejzip",
                "n45rb09q",
                "cs1poy28",
                "xaxhdtmi"
              ],
              "floorTexture": "light-oak",
              "area": 32.5
            }
          ],
          "doors": [
            {
              "id": "ri02cnm3",
              "wallId": "phvbebmu",
              "position": 0.8,
              "width": 90,
              "height": 210,
              "type": "single",
              "swingDirection": "left",
              "flipSide": false
            },
            {
              "id": "5vzer8y2",
              "wallId": "mrcejzip",
              "position": 0.5,
              "width": 300,
              "height": 210,
              "type": "double",
              "swingDirection": "left",
              "flipSide": false
            },
            {
              "id": "djdsr69e",
              "wallId": "9779xycw",
              "position": 0.6,
              "width": 90,
              "height": 210,
              "type": "single",
              "swingDirection": "left",
              "flipSide": false
            },
            {
              "id": "q7q6yxj5",
              "wallId": "pw24r5jz",
              "position": 0.5,
              "width": 90,
              "height": 210,
              "type": "single",
              "swingDirection": "left",
              "flipSide": false
            },
            {
              "id": "trlthzki",
              "wallId": "xvghl92m",
              "position": 0.3,
              "width": 90,
              "height": 210,
              "type": "single",
              "swingDirection": "left",
              "flipSide": false
            },
            {
              "id": "cftusuau",
              "wallId": "j5kb9mas",
              "position": 0.5,
              "width": 90,
              "height": 210,
              "type": "single",
              "swingDirection": "left",
              "flipSide": false
            },
            {
              "id": "ffwybstc",
              "wallId": "zp1xe5hf",
              "position": 0.5,
              "width": 90,
              "height": 210,
              "type": "single",
              "swingDirection": "left",
              "flipSide": false
            },
            {
              "id": "zbqvbt3e",
              "wallId": "n45rb09q",
              "position": 0.3,
              "width": 90,
              "height": 210,
              "type": "single",
              "swingDirection": "left",
              "flipSide": false
            }
          ],
          "windows": [
            {
              "id": "str62d0g",
              "wallId": "lg5h806h",
              "position": 0.15,
              "width": 140,
              "height": 120,
              "sillHeight": 90,
              "type": "standard"
            },
            {
              "id": "rhl9pa6k",
              "wallId": "lg5h806h",
              "position": 0.45,
              "width": 140,
              "height": 120,
              "sillHeight": 90,
              "type": "standard"
            },
            {
              "id": "lg4nh0s5",
              "wallId": "lg5h806h",
              "position": 0.8,
              "width": 140,
              "height": 120,
              "sillHeight": 90,
              "type": "standard"
            },
            {
              "id": "8bpiebl6",
              "wallId": "whcf9cv2",
              "position": 0.3,
              "width": 120,
              "height": 120,
              "sillHeight": 90,
              "type": "standard"
            },
            {
              "id": "nqvio771",
              "wallId": "whcf9cv2",
              "position": 0.7,
              "width": 180,
              "height": 120,
              "sillHeight": 90,
              "type": "standard"
            },
            {
              "id": "4wfq1m5b",
              "wallId": "cs1poy28",
              "position": 0.7,
              "width": 150,
              "height": 120,
              "sillHeight": 90,
              "type": "standard"
            },
            {
              "id": "uy5t0vr6",
              "wallId": "irjmbyqg",
              "position": 0.1,
              "width": 120,
              "height": 120,
              "sillHeight": 90,
              "type": "standard"
            }
          ],
          "furniture": [
            {
              "id": "3s34714b",
              "catalogId": "bed_queen",
              "position": {
                "x": 150,
                "y": 120
              },
              "rotation": 0,
              "scale": {
                "x": 1,
                "y": 1,
                "z": 1
              }
            },
            {
              "id": "vy1dh1df",
              "catalogId": "bed_queen",
              "position": {
                "x": 550,
                "y": 120
              },
              "rotation": 0,
              "scale": {
                "x": 1,
                "y": 1,
                "z": 1
              }
            },
            {
              "id": "lbkdt1gr",
              "catalogId": "bed_twin",
              "position": {
                "x": 1050,
                "y": 120
              },
              "rotation": 0,
              "scale": {
                "x": 1,
                "y": 1,
                "z": 1
              }
            },
            {
              "id": "929s823r",
              "catalogId": "sofa",
              "position": {
                "x": 500,
                "y": 450
              },
              "rotation": 0,
              "scale": {
                "x": 1,
                "y": 1,
                "z": 1
              }
            },
            {
              "id": "vemdx0ly",
              "catalogId": "dining_table",
              "position": {
                "x": 1100,
                "y": 470
              },
              "rotation": 0,
              "scale": {
                "x": 1,
                "y": 1,
                "z": 1
              }
            },
            {
              "id": "4ut780gy",
              "catalogId": "toilet",
              "position": {
                "x": 80,
                "y": 450
              },
              "rotation": 0,
              "scale": {
                "x": 1,
                "y": 1,
                "z": 1
              }
            },
            {
              "id": "b86ttpr9",
              "catalogId": "sink_b",
              "position": {
                "x": 80,
                "y": 530
              },
              "rotation": 0,
              "scale": {
                "x": 1,
                "y": 1,
                "z": 1
              }
            },
            {
              "id": "o5vi7zwx",
              "catalogId": "toilet",
              "position": {
                "x": 880,
                "y": 450
              },
              "rotation": 0,
              "scale": {
                "x": 1,
                "y": 1,
                "z": 1
              }
            },
            {
              "id": "5n8aegie",
              "catalogId": "sink_b",
              "position": {
                "x": 880,
                "y": 530
              },
              "rotation": 0,
              "scale": {
                "x": 1,
                "y": 1,
                "z": 1
              }
            },
            {
              "id": "3srr4a1o",
              "catalogId": "camera",
              "position": {
                "x": 350,
                "y": 125
              },
              "rotation": 240,
              "scale": {
                "x": 1,
                "y": 1,
                "z": 1
              }
            },
            {
              "id": "c5t2gb8x",
              "catalogId": "camera",
              "position": {
                "x": 1250,
                "y": 175
              },
              "rotation": 0,
              "scale": {
                "x": 1,
                "y": 1,
                "z": 1
              }
            },
            {
              "id": "2i2ebqoi",
              "catalogId": "camera",
              "position": {
                "x": 200,
                "y": 775
              },
              "rotation": 0,
              "scale": {
                "x": 1,
                "y": 1,
                "z": 1
              }
            },
            {
              "id": "uem6oqib",
              "catalogId": "camera",
              "position": {
                "x": 350,
                "y": 525
              },
              "rotation": 225,
              "scale": {
                "x": 1,
                "y": 1,
                "z": 1
              }
            },
            {
              "id": "h5sbi17v",
              "catalogId": "camera",
              "position": {
                "x": 775,
                "y": 450
              },
              "rotation": 90,
              "scale": {
                "x": 1,
                "y": 1,
                "z": 1
              }
            },
            {
              "id": "6uqjgzjq",
              "catalogId": "camera",
              "position": {
                "x": 1275,
                "y": 500
              },
              "rotation": 345,
              "scale": {
                "x": 1,
                "y": 1,
                "z": 1
              }
            }
          ],
          "stairs": [],
          "columns": [],
          "guides": [],
          "measurements": [],
          "annotations": [],
          "textAnnotations": [],
          "groups": []
        }
      ],
      "activeFloorId": "1fg6pga0",
      "createdAt": "2026-04-13T08:10:35.869Z",
      "updatedAt": "2026-04-13T08:58:30.617Z"
    };
    currentProject.set(project || floorData || createDefaultProject());
  })
  
  onMount(() => {
    ready = true;
    // Auto-save on every project change (debounced)
    let saveTimeout: ReturnType<typeof setTimeout>;
    const unsub = currentProject.subscribe((p) => {
      if (!p) return;
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => localStore.save(p), 500);
    });
    return () => { unsub(); clearTimeout(saveTimeout); };
  });
</script>

<svelte:window on:keydown={(e) => { if (e.key === 'p' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); printOpen = true; } if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || (e.key === '/' && !e.ctrlKey && !e.metaKey && (e.target as HTMLElement)?.tagName !== 'INPUT' && (e.target as HTMLElement)?.tagName !== 'TEXTAREA')) { e.preventDefault(); commandPaletteOpen = !commandPaletteOpen; } if (e.key === '?' && !e.ctrlKey && !e.metaKey) { showHelp = !showHelp; e.preventDefault(); } if (e.key === 'Escape' && showHelp) { showHelp = false; } if (e.key === 'l' && !e.ctrlKey && !e.metaKey && !e.altKey && (e.target as HTMLElement)?.tagName !== 'INPUT') { showLayers = !showLayers; } }} />

{#if ready}
  <div class="h-screen flex flex-col overflow-hidden">
    <TopBar viewOnly={config.viewOnly} onDispatch={onDispatch} />
    <div class="flex flex-1 overflow-hidden">
      {#if mode === '2d' && !config?.viewOnly}
        <BuildPanel bind:showHelp={showHelp} bind:showLayers={showLayers} bind:showUndoHistory={showUndoHistory} />
      {/if}
      <div class="flex-1 min-w-0 relative">
        {#if mode === '2d'}
          <FloorPlanCanvas viewOnly={config?.viewOnly} />
          <AlignmentToolbar />
        {/if}
      </div>
      {#if showLayers && mode === '2d'}
        <LayersPanel />
      {/if}
      <PropertiesPanel is3D={mode === '3d'} />
    </div>
  </div>
  
  <UndoHistoryPanel bind:visible={showUndoHistory} />
  
  <!-- Shortcuts overlay -->
  {#if showHelp}
    {@const shortcutsCopied = { value: false }}
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onclick={() => showHelp = false} onkeydown={(e) => { if (e.key === 'Escape') showHelp = false; }} role="dialog" tabindex="-1" aria-label="Keyboard Shortcuts">
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[85vh] flex flex-col" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()} role="document">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 pt-5 pb-3 border-b border-gray-100">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"/></svg>
            <h2 class="text-lg font-bold text-slate-800">Keyboard Shortcuts</h2>
          </div>
          <div class="flex items-center gap-2">
            <button
              class="text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 transition-colors flex items-center gap-1.5"
              onclick={() => {
                const text = [
                  'KEYBOARD SHORTCUTS — Open3D Floorplan',
                  '',
                  '── TOOLS ──',
                  'V          Select tool',
                  'W          Wall tool',
                  'D          Door tool',
                  'H          Pan mode',
                  'M          Measure tool',
                  'N          Annotate tool',
                  'T          Text tool',
                  'S          Toggle snap',
                  '',
                  '── EDIT ──',
                  'Ctrl+Z     Undo',
                  'Ctrl+Y     Redo',
                  'Ctrl+C     Copy',
                  'Ctrl+V     Paste',
                  'Ctrl+A     Select all',
                  'Ctrl+D     Deselect all',
                  'Ctrl+S     Save project',
                  'Esc        Cancel / Deselect',
                  '',
                  '── ELEMENTS ──',
                  'R          Rotate element',
                  'Del/Back   Delete selected',
                  'Ctrl+L     Lock/Unlock',
                  'Ctrl+G     Group selection',
                  'Ctrl+⇧+G   Ungroup',
                  '',
                  '── VIEW ──',
                  'Tab        Toggle 2D/3D',
                  'F          Zoom to fit',
                  'G          Toggle grid',
                  'L          Toggle layers',
                  '?          Show shortcuts',
                  '',
                  '── CANVAS ──',
                  'Scroll     Zoom in/out',
                  '+/-        Zoom in/out',
                  'Space+Drag Pan canvas',
                  '',
                  '── WALLS ──',
                  'Dbl-click  Finish wall chain',
                  'C          Close wall loop',
                ].join('\n');
                navigator.clipboard.writeText(text);
              }}
              aria-label="Copy all shortcuts"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
              Copy All
            </button>
            <button class="text-gray-400 hover:text-gray-600 text-xl leading-none" onclick={() => showHelp = false} aria-label="Close shortcuts">✕</button>
          </div>
        </div>
        
        <!-- Body -->
        <div class="overflow-y-auto px-6 py-4">
          <div class="grid grid-cols-2 gap-x-8 gap-y-0 text-sm">
            <!-- Left column -->
            <div>
              <!-- Tools -->
              <div class="flex items-center gap-2 mb-2">
                <span class="text-xs font-bold uppercase tracking-wider text-indigo-500">Tools</span>
                <div class="flex-1 h-px bg-indigo-100"></div>
              </div>
              <div class="space-y-1.5 mb-5">
                <div class="flex justify-between"><span class="text-gray-600">Select tool</span><kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono text-slate-700 border border-gray-200">V</kbd></div>
                <div class="flex justify-between"><span class="text-gray-600">Wall tool</span><kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono text-slate-700 border border-gray-200">W</kbd></div>
                <div class="flex justify-between"><span class="text-gray-600">Door tool</span><kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono text-slate-700 border border-gray-200">D</kbd></div>
                <div class="flex justify-between"><span class="text-gray-600">Pan mode</span><kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono text-slate-700 border border-gray-200">H</kbd></div>
                <div class="flex justify-between"><span class="text-gray-600">Measure tool</span><kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono text-slate-700 border border-gray-200">M</kbd></div>
                <div class="flex justify-between"><span class="text-gray-600">Annotate tool</span><kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono text-slate-700 border border-gray-200">N</kbd></div>
                <div class="flex justify-between"><span class="text-gray-600">Text tool</span><kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono text-slate-700 border border-gray-200">T</kbd></div>
                <div class="flex justify-between"><span class="text-gray-600">Toggle snap</span><kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono text-slate-700 border border-gray-200">S</kbd></div>
              </div>
              
              <!-- Edit -->
              <div class="flex items-center gap-2 mb-2">
                <span class="text-xs font-bold uppercase tracking-wider text-amber-500">Edit</span>
                <div class="flex-1 h-px bg-amber-100"></div>
              </div>
              <div class="space-y-1.5 mb-5">
                <div class="flex justify-between"><span class="text-gray-600">Undo</span><kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono text-slate-700 border border-gray-200">Ctrl+Z</kbd></div>
                <div class="flex justify-between"><span class="text-gray-600">Redo</span><kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono text-slate-700 border border-gray-200">Ctrl+Y</kbd></div>
                <div class="flex justify-between"><span class="text-gray-600">Copy</span><kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono text-slate-700 border border-gray-200">Ctrl+C</kbd></div>
                <div class="flex justify-between"><span class="text-gray-600">Paste</span><kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono text-slate-700 border border-gray-200">Ctrl+V</kbd></div>
                <div class="flex justify-between"><span class="text-gray-600">Select all</span><kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono text-slate-700 border border-gray-200">Ctrl+A</kbd></div>
                <div class="flex justify-between"><span class="text-gray-600">Deselect all</span><kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono text-slate-700 border border-gray-200">Ctrl+D</kbd></div>
                <div class="flex justify-between"><span class="text-gray-600">Save project</span><kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono text-slate-700 border border-gray-200">Ctrl+S</kbd></div>
                <div class="flex justify-between"><span class="text-gray-600">Cancel / Deselect</span><kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono text-slate-700 border border-gray-200">Esc</kbd></div>
              </div>
            </div>
            
            <!-- Right column -->
            <div>
              <!-- Elements -->
              <div class="flex items-center gap-2 mb-2">
                <span class="text-xs font-bold uppercase tracking-wider text-emerald-500">Elements</span>
                <div class="flex-1 h-px bg-emerald-100"></div>
              </div>
              <div class="space-y-1.5 mb-5">
                <div class="flex justify-between"><span class="text-gray-600">Rotate element</span><kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono text-slate-700 border border-gray-200">R</kbd></div>
                <div class="flex justify-between"><span class="text-gray-600">Delete selected</span><kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono text-slate-700 border border-gray-200">Del</kbd></div>
                <div class="flex justify-between"><span class="text-gray-600">Lock / Unlock</span><kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono text-slate-700 border border-gray-200">Ctrl+L</kbd></div>
                <div class="flex justify-between"><span class="text-gray-600">Group selection</span><kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono text-slate-700 border border-gray-200">Ctrl+G</kbd></div>
                <div class="flex justify-between"><span class="text-gray-600">Ungroup</span><kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono text-slate-700 border border-gray-200">Ctrl+⇧+G</kbd></div>
              </div>
              
              <!-- View -->
              <div class="flex items-center gap-2 mb-2">
                <span class="text-xs font-bold uppercase tracking-wider text-blue-500">View</span>
                <div class="flex-1 h-px bg-blue-100"></div>
              </div>
              <div class="space-y-1.5 mb-5">
                <div class="flex justify-between"><span class="text-gray-600">Toggle 2D / 3D</span><kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono text-slate-700 border border-gray-200">Tab</kbd></div>
                <div class="flex justify-between"><span class="text-gray-600">Zoom to fit</span><kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono text-slate-700 border border-gray-200">F</kbd></div>
                <div class="flex justify-between"><span class="text-gray-600">Toggle grid</span><kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono text-slate-700 border border-gray-200">G</kbd></div>
                <div class="flex justify-between"><span class="text-gray-600">Toggle layers</span><kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono text-slate-700 border border-gray-200">L</kbd></div>
                <div class="flex justify-between"><span class="text-gray-600">Show shortcuts</span><kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono text-slate-700 border border-gray-200">?</kbd></div>
              </div>
              
              <!-- Canvas -->
              <div class="flex items-center gap-2 mb-2">
                <span class="text-xs font-bold uppercase tracking-wider text-purple-500">Canvas</span>
                <div class="flex-1 h-px bg-purple-100"></div>
              </div>
              <div class="space-y-1.5 mb-5">
                <div class="flex justify-between"><span class="text-gray-600">Zoom in / out</span><kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono text-slate-700 border border-gray-200">Scroll</kbd></div>
                <div class="flex justify-between"><span class="text-gray-600">Zoom in / out</span><kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono text-slate-700 border border-gray-200">+ / −</kbd></div>
                <div class="flex justify-between"><span class="text-gray-600">Pan canvas</span><kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono text-slate-700 border border-gray-200">Space+Drag</kbd></div>
              </div>
              
              <!-- Walls -->
              <div class="flex items-center gap-2 mb-2">
                <span class="text-xs font-bold uppercase tracking-wider text-rose-500">Walls</span>
                <div class="flex-1 h-px bg-rose-100"></div>
              </div>
              <div class="space-y-1.5">
                <div class="flex justify-between"><span class="text-gray-600">Finish wall chain</span><kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono text-slate-700 border border-gray-200">Dbl-click</kbd></div>
                <div class="flex justify-between"><span class="text-gray-600">Close wall loop</span><kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono text-slate-700 border border-gray-200">C</kbd></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="px-6 py-3 border-t border-gray-100 text-center">
          <p class="text-xs text-gray-400">Press <kbd class="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono border border-gray-200">?</kbd> or <kbd class="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono border border-gray-200">Esc</kbd> to close</p>
        </div>
      </div>
    </div>
  {/if}
  
  <CommandPalette bind:open={commandPaletteOpen} />
  <PrintLayout bind:open={printOpen} />
  <OnboardingTooltip />
{:else}
  <div class="h-screen flex items-center justify-center">
    <p class="text-gray-400">Loading...</p>
  </div>
{/if}
