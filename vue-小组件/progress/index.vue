<template>
  <div class="canvas-container">
    <div class="canvas">
      <canvas
        :id="id"
        width="160"
        height="160"
        style="width: 80px; height: 80px"
      ></canvas>
      <p class="percent">{{ n.toFixed(0) + "%" }}</p>
    </div>
    <div class="message">{{ message }}</div>
  </div>
</template>

<script>
export default {
  props: {
    percent: {
      style: Number,
    },
    id: {
      type: String,
      default: "canvas-id",
    },
    message: {
      type: String,
      default: "上传中",
    },
  },
  data() {
    return {
      num: 0,
      canvas: "",
      context: "",
      cirX: "",
      cirY: "",
      rad: "",
      n: 1,
      speed: 150,
      r: 36,
    };
  },
  watch: {
    percent(newV, oldV) {
      if (newV > oldV && newV <= 100) {
        requestAnimationFrame(this.DreamLoading);
      }
    },
  },
  mounted() {
    this.canvas = document.getElementById(this.id);
    this.context = this.canvas.getContext("2d");
    this.context.scale(2, 2);
    (this.cirX = 40), //this.canvas.width/ 2
      (this.cirY = 40), //this.canvas.height/ 2
      (this.rad = (Math.PI * 2) / 100);
    this.DreamLoading();
  },
  created() {},
  methods: {
    //绘制最外层细圈
    writeCircle() {
      this.context.save(); //save和restore可以保证样式属性只运用于该段canvas元素
      this.context.beginPath(); //开始路径
      this.context.strokeStyle = "#EEF0F5"; //设置边线的颜色
      this.context.lineWidth = 5;
      this.context.arc(this.cirX, this.cirY, this.r, 0, Math.PI * 2, false); //画一个圆的路径
      this.context.stroke(); //绘制边线
      //      this.context.restore();
      this.context.closePath();
    },
    //绘制文本
    writeText(n) {
      this.context.save();
      this.context.font = "20px Arial";
      this.context.fillStyle = "#49f"; //字体颜色
      this.context.fillText(n.toFixed(0) + "%", this.cirX - 20, this.cirY + 10); //绘制实心
      //context.strokeStyle = "#49f";
      // context.strokeText(n.toFixed(0)+"%",cirX - 30 ,cirY +10); //绘制空心
      this.context.stroke();
      this.context.restore();
    },
    //绘制蓝色外圈
    writeBlue(n) {
      this.context.save();
      this.context.strokeStyle = "#0c83f3";
      this.context.lineWidth = 7;
      this.context.lineCap = "round";
      this.context.beginPath();
      this.context.arc(
        this.cirX,
        this.cirY,
        this.r,
        -Math.PI / 2,
        -Math.PI / 2 + this.rad * n,
        false
      );
      this.context.stroke();
      this.context.restore();
    },
    DreamLoading() {
      console.log(this.n);
      //清除所有，重新绘制
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.n = this.percent;
      this.writeCircle();
      // this.writeText(this.n);
      this.writeBlue(this.n);

      // if (this.n <= this.percent) {
      //   this.n = this.n + 0.4;
      // } else {
      //   return (this.n = 0);
      // }
    },
  },
};
</script>

<style lang="less" scoped>
.canvas {
  position: relative;

  .percent {
    font: 20px Arial;
    color: #49f;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    width: 60px;
    height: 22px;
    text-align: center;
  }
}
.message  {
    text-align: center;
  }
</style>