// import { brush_scatter } from "./interaction.js";
import { top_tip1, top_tip3 } from "./interaction.js";
import { top_tip2 } from "./interaction.js";

const FWith = 600,
  FHeight = 400;
const FLeftTopX = 10,
  FLeftTopY = 10;
const MARGIN = { LEFT: 30, RIGHT: 100, TOP: 10, BOTTOM: 100 };
const WIDTH = FWith - (MARGIN.LEFT + MARGIN.RIGHT);
const HEIGHT = FHeight - (MARGIN.TOP + MARGIN.BOTTOM);

export function draw_scatt1(data, g, filter, Count) {
  // X: Installs , Y: Rating
  //text

  if (filter == undefined);
  else {
    g.selectAll(".NormScatter").remove();
    g.selectAll(".scatterYa").remove();
    g.selectAll(".scatterXa").remove();
  }
  var result = [];
  for (var i in Count) {
    result.push([i, Count[i]]);
  }
  var legentext = [];
  for (let i = 0; i < result.length; i++) {
    legentext.push([result[i][0]]);
  }
  var color = d3.scaleOrdinal().domain(legentext).range(d3.schemeSet3);
  const colorscale = d3
    .scaleThreshold()
    .domain([1, 2, 3, 4, 5])
    .range(d3.schemeSet3);

  g.append("g")
    .append("text")
    .attr("x", WIDTH)
    .attr("y", HEIGHT + 80)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Installs");
  g.append("text")
    .attr("x", -(HEIGHT / 2))
    .attr("y", -20)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Rating");
  //產生xylabel
  // xscale
  const xscale = d3
    .scaleLinear()
    ///
    .domain([d3.min(data, (d) => d.Installs), d3.max(data, (d) => d.Installs)])
    .range([0, WIDTH]);
  //yscale
  const yscale = d3
    .scaleLinear()
    .domain([1, d3.max(data, (d) => d.Rating)])
    .range([HEIGHT, 0]);
  // Y label

  const yAxisCall = d3.axisLeft(yscale);
  const xAxisCall = d3.axisBottom(xscale);
  //generate the box of the char
  g.append("g").attr("class", "scatterYa").call(yAxisCall);
  g.append("g")
    .attr("class", "scatterXa")
    .call(xAxisCall)
    .attr("transform", "translate(0," + HEIGHT + ")")
    .selectAll("text")
    .attr("dx", "-3em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)");

  var circles = g
    .append("g")
    .selectAll("dot")
    .data(data)
    .join("circle")
    .attr("class", "NormScatter")
    // circle size of the
    .attr("cx", function (d) {
      return xscale(d.Installs);
    })
    .attr("cy", function (d) {
      return yscale(d.Rating);
      //if (d.Type == "Paid") return yscale(d.Rating);
    })
    .attr("r", 7)
    .style("fill", function (d) {
      if (filter != undefined) {
        return color(d.Category);
      } else {
        if (d.Category == "BUSINESS") return colorscale(0);
        else if (d.Category == "FAMILY") return colorscale(1);
        else if (d.Category == "GAME") return colorscale(2);
        else if (d.Category == "MEDICAL") return colorscale(3);
        else if (d.Category == "TOOLS") return colorscale(4);
        else return colorscale(5);
      }
    });

  var tip = top_tip1();
  circles.call(tip);
  circles.on("mousemove", tip.show).on("mouseout", tip.hide);
  // circleG.call(brush);
}
export function draw_scatt2(data, g, filter, Count) {
  // X : rating , Y: Size

  if (filter == undefined);
  else {
    g.selectAll(".NormScatter").remove();
    g.selectAll(".scatterYa").remove();
    g.selectAll(".scatterXa").remove();
  }
  var cir_use = g.append("g");
  var result = [];
  for (var i in Count) {
    result.push([i, Count[i]]);
  }
  var legentext = [];
  for (let i = 0; i < result.length; i++) {
    legentext.push([result[i][0]]);
  }
  var color = d3.scaleOrdinal().domain(legentext).range(d3.schemeSet3);
  const colorscale = d3
    .scaleThreshold()
    .domain([1, 2, 3, 4, 5])
    .range(d3.schemeSet3);
  var Color_free = d3
    .scaleSequential()
    .domain([1, 500])
    .interpolator(d3.interpolateYlOrBr);

  g.append("g")
    .append("text")
    .attr("x", WIDTH)
    .attr("y", HEIGHT + 40)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Rating");
  g.append("text")
    .attr("x", -(HEIGHT / 2))
    .attr("y", -20)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Size");
  //產生xylabel
  // yscale
  const xscale = d3
    .scaleLinear()
    ///
    .domain([
      d3.min(data, (d) => d.Rating) - 0.1,
      d3.max(data, (d) => d.Rating),
    ])
    .range([0, WIDTH]);
  //xscale
  const yscale = d3
    .scaleLinear()
    .domain([d3.min(data, (d) => d.Size) - 5, d3.max(data, (d) => d.Size) + 20])
    .range([HEIGHT, 0]);
  // Y label

  const yAxisCall = d3.axisLeft(yscale);
  const xAxisCall = d3.axisBottom(xscale);
  //generate the box of the char
  g.append("g").attr("class", "scatterYa").call(yAxisCall);
  g.append("g")
    .attr("class", "scatterXa")
    .attr("transform", "translate(0," + HEIGHT + ")")
    .call(xAxisCall);

  //



  var circles = cir_use 
    .append("g")
    .selectAll("dot")
    .data(data)

    .join("circle")
    .attr("class", "NormScatter")
    // circle size of the
    .attr("cx", function (d) {
      return xscale(d.Rating);
    })
    .attr("cy", function (d) {
      return yscale(d.Size);
    })
    .attr("r", 7)
    .style("fill", function (d) {
      if (filter != undefined) {
        return color(d.Category);
      } else {
        if (d.Category == "BUSINESS") return colorscale(0);
        else if (d.Category == "FAMILY") return colorscale(1);
        else if (d.Category == "GAME") return colorscale(2);
        else if (d.Category == "MEDICAL") return colorscale(3);
        else if (d.Category == "TOOLS") return colorscale(4);
        else return colorscale(5);
      }
    });
  var tip = top_tip2();

  // circles_free.call(tip);
  // circles_free.on("mousemove", tip.show).on("mouseout", tip.hide);
  circles.call(tip);
  circles.on("mousemove", tip.show).on("mouseout", tip.hide);
  // circleG.call(brush);
}

export function draw_scatt4(data, g, filter, Count) {
  //text
  //x:Reviews
  //y:rating
  if (filter == undefined);
  else {
    g.selectAll(".NormScatter").remove();
    g.selectAll(".scatterYa").remove();
    g.selectAll(".scatterXa").remove();
  }
  var result = [];
  for (var i in Count) {
    result.push([i, Count[i]]);
  }
  var legentext = [];
  for (let i = 0; i < result.length; i++) {
    legentext.push([result[i][0]]);
  }
  var color = d3.scaleOrdinal().domain(legentext).range(d3.schemeSet3);
  const colorscale = d3
    .scaleThreshold()
    .domain([1, 2, 3, 4, 5])
    .range(d3.schemeSet3);

  // var brush = brush_scatter(g);
  //https://github.com/d3/d3-scale-chromatic
  //https://d3-graph-gallery.com/graph/custom_color.html

  g.append("g")
    .append("text")
    .attr("x", WIDTH)
    .attr("y", HEIGHT + 40)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Review");
  g.append("text")
    .attr("x", -(HEIGHT / 2) - 5)
    .attr("y", -25)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Rating");
  //產生xylabel
  // yscale
  var mean = d3.mean(data, (d) => d["Reviews"]);
  const xscale = d3
    .scaleLinear()

    .domain([d3.min(data, (d) => d["Reviews"]), mean])
    .range([0, WIDTH]);
  //xscale
  const yscale = d3
    .scaleLinear()
    .domain([
      d3.min(data, (d) => d["Rating"]),
      d3.max(data, (d) => d["Rating"]),
    ])
    .range([HEIGHT, 0]);
  // Y label

  const yAxisCall = d3.axisLeft(yscale);
  const xAxisCall = d3.axisBottom(xscale);
  //generate the box of the char
  g.append("g").attr("class", "scatterYa").call(yAxisCall);
  g.append("g")
    .attr("class", "scatterXa")
    .call(xAxisCall)
    .attr("transform", "translate(0," + HEIGHT + ")");

  // makesure the text is remove

  var circles = g
    .append("g")
    .selectAll("dot")
    .data(data)

    .join("circle")
    .attr("class", "NormScatter")
    // circle size of the
    // .attr("cx", function (d) {return xscale(d["Reviews"]);})
    // .attr("cy", function (d) {return yscale(d["Rating"]);})
    .attr("cx", function (d) {
      if (d["Reviews"] != null && mean >= d["Reviews"]) {
        return xscale(d["Reviews"]);
      }
    })
    .attr("cy", function (d) {
      if (d["Reviews"] != null && mean >= d["Reviews"]) {
        return yscale(d["Rating"]);
      }
    })
    .attr("r", 7)
    .style("fill", function (d) {
      if (filter != undefined) {
        return color(d.Category);
      } else {
        if (d.Category == "BUSINESS") return colorscale(0);
        else if (d.Category == "FAMILY") return colorscale(1);
        else if (d.Category == "GAME") return colorscale(2);
        else if (d.Category == "MEDICAL") return colorscale(3);
        else if (d.Category == "TOOLS") return colorscale(4);
        else return colorscale(5);
      }
    });

  var tip = top_tip3();
  circles.call(tip);
  circles.on("mousemove", tip.show).on("mouseout", tip.hide);
  return { circles: circles };
}
export function draw_scatt5(data, g, filter, Count) {
  // x:time y:reviews
  if (filter == undefined);
  else {
    g.selectAll(".NormScatter").remove();
    g.selectAll(".scatterYa").remove();
    g.selectAll(".scatterXa").remove();
  }

  var result = [];
  for (var i in Count) {
    result.push([i, Count[i]]);
  }
  var legentext = [];
  for (let i = 0; i < result.length; i++) {
    legentext.push([result[i][0]]);
  }
  var color = d3.scaleOrdinal().domain(legentext).range(d3.schemeSet3);

  g.append("g")
    .append("text")
    .attr("x", WIDTH - 30)
    .attr("y", HEIGHT + 40)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Update time");
  g.append("text")
    .attr("x", -(HEIGHT / 2))
    .attr("y", -20)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Review");

  var xScale = d3
    .scaleTime()
    .domain([new Date("2010-01-01"), new Date("2018-08-08")])
    .range([0, WIDTH]);

  var xAxis = d3.axisBottom(xScale).tickFormat(function (date) {
    if (d3.timeYear(date) < date) {
      return d3.timeFormat("%b")(date);
    } else {
      return d3.timeFormat("%Y")(date);
    }
  });
  g.append("g")
    .attr("class", "scatterXa")
    .call(xAxis)
    .attr("transform", "translate(0," + HEIGHT + ")");
  var mean = d3.mean(data, (d) => d["Reviews"]);
  const yscale = d3
    .scaleLinear()

    .domain([d3.min(data, (d) => d["Reviews"]), mean])

    .range([HEIGHT, 0]);
  // Y label

  const yAxisCall = d3.axisLeft(yscale);

  g.append("g").attr("class", "scatterYa").call(yAxisCall);
  var circles = g
    .append("g")
    .selectAll("dot")
    .data(data)
    .join("circle")
    .attr("class", "NormScatter")
    // circle size of the
    .attr("cx", function (d) {
      if (d.Rating != null && d.Size != null && d.Type == "Paid") {
        return xScale(d["Last Updated"]);
      }
    })
    .attr("cy", function (d) {
      if (d.Rating != null && d.Size != null && d.Type == "Paid") {
        return yscale(d["Reviews"]);
      }
    })
    .attr("r", 7)
    .style("fill", function (d) {
      if (filter != undefined) {
        return color(d.Category);
      } else {
        if (d.Category == "BUSINESS") return colorscale(0);
        else if (d.Category == "FAMILY") return colorscale(1);
        else if (d.Category == "GAME") return colorscale(2);
        else if (d.Category == "MEDICAL") return colorscale(3);
        else if (d.Category == "TOOLS") return colorscale(4);
        else return colorscale(5);
      }
    });
  var tip = top_tip3();
  circles.call(tip);
  circles.on("mousemove", tip.show).on("mouseout", tip.hide);
}
