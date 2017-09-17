import * as d3 from "d3";

class Circle {

    constructor({el, viewWidth, viewHeight}) {
        this.el = el;
        this.stage = {
            width: viewWidth,
            height: viewHeight,
            x: viewWidth * 0.5,
            y: viewHeight * 0.5
        }
        this.draw();

    }

    draw = () => {

        d3
            .select(this.el)
            .append("svg")
            .attr("id", "svg-circle")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 " + this.stage.width + ' ' + this.stage.height)
            .attr("width", "100%")
            .attr("height", "100%")
            .append("g")
            .append("circle")
            .attr("cx", this.stage.x)
            .attr("cy", this.stage.y)
            .attr("r", 150)
            .style("fill", "#000");

    }

};

new Circle({el: ".page-content", viewWidth: 960, viewHeight: 500});