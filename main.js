import { piechart } from "./src/mainpie.js";
import { draw_scatt1, draw_scatt4, draw_scatt5 } from "./src/drawscatter.js";
import { draw_scatt2 } from "./src/drawscatter.js";
import { frame_init } from "./src/init.js";
import { dropdown } from "./src/dropdown_buttom.js";
import { draw_histamgram } from "./src/drawHistogram.js";
import { change_picture } from "./src/picture_change.js";

const FWith = 800,
  FHeight = 400;
const FLeftTopX = 10,
  FLeftTopY = 10;
const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 100 };
const WIDTH = FWith - (MARGIN.LEFT + MARGIN.RIGHT);
const HEIGHT = FHeight - (MARGIN.TOP + MARGIN.BOTTOM);
//frame genration
const svg1 = d3
  .select("#pie")
  .append("svg")
  .attr("width", FWith)
  .attr("height", FHeight);

const g1 = svg1
  .append("g")
  .attr(
    "transform",
    `translate(${FLeftTopX + MARGIN.LEFT}, ${FLeftTopY + MARGIN.TOP})`
  );
var g2 = frame_init("area1");
var g3 = frame_init("area2");
var g4 = frame_init("area3");

var g5 = frame_init("area4");
var gpic = frame_init("pic");
//main data
d3.csv("./persudu/data_clean.csv", d3.autoType).then(function (data) {
  d3.json("./persudu/subcount.json").then(function (count) {
    var botton = dropdown(count);
    change_picture(gpic, "GOOGLE-PLAY");
    var piechar = piechart(count, g1);
    var pie = piechar["pie"];
    var radius = piechar["radius"];

    draw_scatt1(data, g2, undefined, count);

    draw_scatt2(data, g3, undefined, count);

    draw_scatt4(data, g4, undefined, count);
    // draw_scatt5(data, g5);
    draw_histamgram(data, count, g5);

    pie
      .on("mouseover", function (d, i) {
        d3.select(this)
          .transition()
          .duration("50")
          .attr("opacity", "0.5")
          .attr(
            "d",
            d3
              .arc()
              .innerRadius(30)
              .outerRadius(radius + 20)
          );
      })
      .on("mouseout", function (d, i) {
        d3.select(this)
          .transition()
          .duration("50")
          .attr("opacity", "1")
          .attr("d", d3.arc().innerRadius(0).outerRadius(radius));
      })
      .on("click", (d, i) => {
        // the click we use that help the radius update by the click
        var click_value = d.data.key;

        d3.select(this).transition().duration("50");
        var selectList = [];
        data.forEach((element) => {
          if (element["Category"] == click_value) {
            selectList.push(element);
          }
        });
        draw_scatt1(selectList, g2, click_value, count);
        draw_scatt2(selectList, g3, click_value, count);
        draw_scatt4(selectList, g4, click_value, count);
        draw_histamgram(selectList, count, g5, 1, click_value);
        gpic.selectAll(".sth").remove();
        gpic.selectAll('text').remove();
        change_picture(gpic, click_value);
      });

    botton["bottom"].on("change", function () {
      // recover the option that has been chosen
      gpic.selectAll(".sth").remove();
      gpic.selectAll('text').remove();
      var selectedOption = d3.select(this).property("value");
      change_picture(gpic, "GOOGLE-PLAY");
      pie.on("click", (d, i) => {
        var click_value = d.data.key;
        d3.select(this).transition().duration("50");
        var selectList = [];
        data.forEach((element) => {
          if (selectedOption != "ALL") {
            if (
              element["Category"] == click_value &&
              element["Type"] == selectedOption
            ) {
              selectList.push(element);
            }
          } else {
            if (element["Category"] == click_value) {
              selectList.push(element);
            }
          }
        });
        draw_scatt1(selectList, g2, click_value, count);
        draw_scatt2(selectList, g3, click_value, count);
        draw_scatt4(selectList, g4, click_value, count);
        draw_histamgram(selectList, count, g5, 1, click_value);
        gpic.selectAll(".sth").remove();
        gpic.selectAll('text').remove();
        change_picture(gpic, click_value);
      });
      // // run the updateChart function with this selected option
      // updateChart(selectedOption)

      var selectList = [];
      if (selectedOption != "ALL") {
        data.forEach((element) => {
          if (element["Type"] == selectedOption) {
            //console.log(element)
            selectList.push(element);
          }
        });
      } else {
        selectList = data;
      }
      draw_scatt1(selectList, g2, selectedOption, count);
      draw_scatt2(selectList, g3, selectedOption, count);
      draw_scatt4(selectList, g4, selectedOption, count);
      draw_histamgram(selectList, count, g5, 1, selectedOption);
    });
  });
});
