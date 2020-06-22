<template>
  <div class="tagCloud">
    <svg :width="width" :height="height" @mousemove="listener($event)">
      <a :href="tag.href" v-for="(tag,index) in tags" :key="index">
        <text
          :x="tag.x"
          :y="tag.y"
          :font-size="20 * (600/(600-tag.z))"
          :fill-opacity="((400+tag.z)/600)"
        >{{tag.text}}</text>
      </a>
    </svg>
  </div>
</template>
<script>
export default {
  data() {
    return {
      width: 1000, //svg宽度
      height: 700, //svg高度
      RADIUS: 300, //球的半径
      speedX: Math.PI / 360, //球一帧绕x轴旋转的角度
      speedY: Math.PI / 360, //球-帧绕y轴旋转的角度
      tags: []
    };
  },
  computed: {
    CX() {
      //球心x坐标
      return this.width / 2;
    },
    CY() {
      //球心y坐标
      return this.height / 2;
    }
  },
  created() {
    this.getAllTags();
  },
  mounted() {
    //使球开始旋转
    setInterval(() => {
      this.rotateX(this.speedX);
      this.rotateY(this.speedY);
    }, 17);
  },
  methods: {
    getAllTags() {
      this.$request
        .get("/getAllTags")
        .then(result => {
          if (result.data.status == 1) {
            this.initTagCloud(result.data.data);
          } else {
            alert("获取标签失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //初始化标签位置
    initTagCloud(data) {
      let tags = [];
      for (let i = 0; i < data.length; i++) {
        let tag = {};
        let k = -1 + (2 * (i + 1) - 1) / data.length;
        let a = Math.acos(k);
        let b = a * Math.sqrt(data.length * Math.PI); //计算标签相对于球心的角度
        tag.text = data[i].text;
        tag.x = this.CX + this.RADIUS * Math.sin(a) * Math.cos(b); //根据标签角度求出标签的x,y,z坐标
        tag.y = this.CY + this.RADIUS * Math.sin(a) * Math.sin(b);
        tag.z = this.RADIUS * Math.cos(a);
        tag.href = this.$imageURl + "search?tag=" + data[i].id; //给标签添加链接
        tags.push(tag);
      }
      this.tags = tags; //让vue替我们完成视图更新
    },
    rotateX(angleX) {
      var cos = Math.cos(angleX);
      var sin = Math.sin(angleX);
      for (let tag of this.tags) {
        var y1 = (tag.y - this.CY) * cos - tag.z * sin + this.CY;
        var z1 = tag.z * cos + (tag.y - this.CY) * sin;
        tag.y = y1;
        tag.z = z1;
      }
    },
    rotateY(angleY) {
      var cos = Math.cos(angleY);
      var sin = Math.sin(angleY);
      for (let tag of this.tags) {
        var x1 = (tag.x - this.CX) * cos - tag.z * sin + this.CX;
        var z1 = tag.z * cos + (tag.x - this.CX) * sin;
        tag.x = x1;
        tag.z = z1;
      }
    },
    listener(event) {
      //响应鼠标移动
      var x = event.clientX - this.CX;
      var y = event.clientY - this.CY;
      this.speedX =
        x * 0.0001 > 0
          ? Math.min(this.RADIUS * 0.00002, x * 0.0001)
          : Math.max(-this.RADIUS * 0.00002, x * 0.0001);
      this.speedY =
        y * 0.0001 > 0
          ? Math.min(this.RADIUS * 0.00002, y * 0.0001)
          : Math.max(-this.RADIUS * 0.00002, y * 0.0001);
    }
  }
};
</script>
<style lang="less" scoped>
.tagCloud {
  text-align: center;
}
</style>