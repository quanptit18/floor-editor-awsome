# Build TS

```
npm run build
npm run publish:ts
```
# Build JS

```
npm run build:js
npm run publish:js
```
# Usage
```
import 'floor-editor-awsome'

const floorRef = useRef(null);
const [floor, setFloor] = useState({
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
});


useEffect(() => {
    if (floorRef.current) {
      floorRef.current.floorData = floor;
      floorRef.current.config = { viewOnly: false };
    }
}, [floor]);

useEffect(() => {
    const handleSave = (e) => {
      console.log('saved:', e.detail);
    };

    const handleAutoSave = (e) => {
      console.log('autoSaved:', e.detail);
    };

    floorRef.current.addEventListener('floor:save', handleSave);
    floorRef.current.addEventListener('floor:autoSave', handleAutoSave);

    // Cleanup khi unmount
    return () => {
      floorRef.current.removeEventListener('floor:save', handleSave);
      floorRef.current.removeEventListener('floor:autoSave', handleAutoSave);
    };
  }, []);

<floor-editor ref={floorRef}></floor-editor>