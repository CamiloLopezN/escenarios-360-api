this.nodos3602 = [
    {
        id: "1",
        panorama: require("../assets/1.jpeg"),
        thumbnail: require("../assets/1.jpeg"),
        name: "Onee",
        links: [{nodeId: "2"}],
        markers: [
            {
                // image marker that opens the panel when clicked
                id: "#" + Math.random(),
                longitude: "105deg",
                latitude: "35deg",
                image: "https://photo-sphere-viewer.js.org/assets/pin-blue.png",
                width: 32,
                height: 32,
                anchor: "bottom center",
                tooltip: {
                    content: "",
                    position: "bottom right",
                },
                data: {
                    generated: true,
                },
                content:
                document.getElementById("marcador-contenido").innerHTML,
                marker_edit: false,
            },
        ],
        position: [-80.156479, 25.666725, 3],
        panoData: {poseHeading: 327},
    },
    {
        id: "2",
        panorama: require("../assets/12.jpeg"),
        thumbnail: require("../assets/12.jpeg"),
        name: "Two55",
        links: [{nodeId: "3"}, {nodeId: "1"}],
        markers: [
            {
                // image marker that opens the panel when clicked
                id: "image",
                longitude: "105deg",
                latitude: "35deg",
                image: "https://photo-sphere-viewer.js.org/assets/pin-blue.png",
                width: 32,
                height: 32,
                anchor: "bottom center",
                tooltip: {
                    content: "",
                    position: "bottom right",
                },
                data: {
                    generated: true,
                },
                content:
                document.getElementById("marcador-contenido").innerHTML,
                marker_edit: false,
            },
        ],
        position: [-80.156168, 25.666623, 3],
        panoData: {poseHeading: 318},
    },
    {
        id: "3",
        panorama: require("../assets/6.jpeg"),
        thumbnail: require("../assets/6.jpeg"),
        name: "Three",
        links: [{nodeId: "4"}, {nodeId: "2"}, {nodeId: "5"}],
        markers: [],
        position: [-80.155932, 25.666498, 5],
        panoData: {poseHeading: 328},
    },
    {
        id: "4",
        panorama: require("../assets/7.jpeg"),
        thumbnail: require("../assets/7.jpeg"),
        name: "Four",
        links: [{nodeId: "3"}, {nodeId: "5"}],
        markers: [],
        position: [-80.156089, 25.666357, 3],
        panoData: {poseHeading: 78},
    },
    {
        id: "5",
        panorama: require("../assets/9.jpeg"),
        thumbnail: require("../assets/9.jpeg"),
        name: "Five",
        links: [{nodeId: "6"}, {nodeId: "3"}, {nodeId: "4"}],
        markers: [],
        position: [-80.156292, 25.666446, 2],
        panoData: {poseHeading: 190},
    },
    {
        id: "6",
        panorama: require("../assets/10.jpeg"),
        thumbnail: require("../assets/10.jpeg"),
        name: "Six",
        links: [{nodeId: "5"}],
        markers: [],
        position: [-80.156465, 25.666496, 2],
        panoData: {poseHeading: 328},
    },
];
