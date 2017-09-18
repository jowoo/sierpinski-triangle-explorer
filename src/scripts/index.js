import * as d3 from "d3";
import {generatePoints} from "./utils";

class Sierpinski {

    constructor({depth, element, viewWidth, viewHeight, triangleHeight}) {

        this.initialDepth = depth;
        this.depth = this.initialDepth;
        this.element = element;

        this.root;
        this.parent;
        this.child;
        this.scale = d3
            .scaleLinear()
            .domain([1, 25])
            .range([this.depth, 10]);
        this.zoom = d3
            .zoom()
            .scaleExtent([1, 25])
            .on("zoom", this.zoom)
        this.stage = {
            scale: 1,
            width: viewWidth,
            height: viewHeight,
            x: viewWidth * 0.5,
            y: viewHeight * 0.5
        }

        this.triangle = {
            height: triangleHeight,
            initialX: this.stage.width * 0.5,
            initialY: 10,
            colour: "#000"
        }

        this.draw();

    }

    drawSierpinski = () => {
        this
            .child
            .selectAll("g")
            .data(this.getPoints)
            .enter()
            .append("polygon")
            .attr("fill", this.triangle.colour)
            .attr("points", function (d) {
                return d
            });
    }

    draw = () => {

        this.root = d3
            .select(this.element)
            .append("svg:svg")
            .attr("id", "sierpinski-triangle-explorer")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 " + this.stage.width + ' ' + this.stage.height)
            .attr("width", "100%")
            .attr("height", "100%")
            .on("dblclick", this.doubleClick)
            .call(this.zoom)
            .on("dblclick.zoom", null);

        this.parent = this.root.append("g");
        this.child = this
            .parent
            .append("g")
            .attr("id", "sierpinski-triangle-container")
            .attr("transform", "translate(" + this.triangle.initialX + "," + this.triangle.initialY + ")")
        this.drawSierpinski();
    }

    reDraw = () => {
        this
            .parent
            .selectAll("g")
            .selectAll("*")
            .remove()

        this.drawSierpinski();
    }

    getPoints = () => {
        return generatePoints([
            0, 0
        ], [
            this.triangle.height / 2,
            this.triangle.height
        ], [-this.triangle.height / 2,
            this.triangle.height
        ], this.depth)
    }

    zoom = () => {
        const {k, x, y} = d3.event.transform;
        let scale = Math.ceil(this.scale(k));
        if (this.stage.scale != scale) {
            this.stage.scale = this.depth = scale;
            this.reDraw();
        }
        this
            .parent
            .attr("transform", d3.event.transform);

    }

    drag = (d) => {
        d3
            .select(this)
            .attr("cx", d.x = d3.event.x)
            .attr("cy", d.y = d3.event.y);
    }

    doubleClick = () => {
        this.stage.scale = 1;
        this.depth = this.initialDepth;
        this.parent
            .attr("transform", "scale(" + this.stage.scale + ")")
        this.root
            .call(this.zoom)
            .call(this.zoom.transform, d3.zoomIdentity);
        this.reDraw();
    }

};

new Sierpinski({depth: 4, element: ".page-content", viewWidth: 480, viewHeight: 250, triangleHeight: 100});