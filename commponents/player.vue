<template>
  <div class="player-container">
    <div class="player"
    @touchstart="start"
    @touchend="end"
    :class="['player', onTouching ? 'onTouching' : '']">
      <div class="volume" v-if="loaded">
        <span class="dot"></span>
        <span :class="['arc1', onPlaying ? 'aniArc1' : '']"></span>
        <span :class="['arc2', onPlaying ? 'aniArc2' : '']"></span>
      </div>
      <div class="volume" v-else>
        <div class="loading" v-if="loading"></div>
        <div v-else></div>
      </div>
      <div class="word" v-if="!loaded">
        点击加载语音评价
      </div>
      <template v-else>
        <div class="word" v-if="onPlaying">
          正在播放语音评价
        </div>
        <div class="word" v-else>
          点击播放语音评价
        </div>
      </template>
      <div class="time">
        {{ remainTime }}''
      </div>
    </div>
  </div>
</template>

<script>
import { isIos } from '@/assets/libs/utils'
export default {
  data() {
    return {
      onTouching: false,
      audio: new Audio(),
      remainTime: 0,
      duration: 0,
      onPlaying: false,
      loading: false,
      loaded: false,
      interval: {},
      srcs: '',
      k: 0,
      isIos: isIos()
    }
  },

  props: {
    src: {
      type: String,
      require: true,
      default: '',
    }
  },

  methods: {
    start() {
      if (this.loaded) {
        this.onTouching = true
        if (!this.onPlaying) {
          this.audio.play()
          this.onPlaying = true
          this.interval = setInterval(() => {
            this.remainTime--
          }, 1000)
          this.audio.onended = () => {
            clearInterval(this.interval)
            this.audio.load()
            this.loaded = false
            this.onPlaying = false
            this.audio.oncanplay = () => {
              this.loaded = true
              this.duration = parseInt(this.audio.duration)
              this.remainTime = this.duration
            }
          }
        } else {
          clearInterval(this.interval)
          this.audio.load()
          this.loaded = false
          this.onPlaying = false
          this.audio.oncanplay = () => {
            this.loaded = true
            this.duration = parseInt(this.audio.duration)
            this.remainTime = this.duration
          }
        }
      }
    },

    setSrc(src) {
      if (isIos()) {
        src = `${src}?avvod/m3u8/autosave/1`
      }
      clearInterval(this.interval)
      this.onPlaying = false
      this.audio.src = src
      this.audio.load()
      this.loading = true
      this.loaded = false
      this.srcs = src
      this.audio.oncanplay = () => {
        this.loaded = true
        this.loading = false
        this.$emit('load')
        this.duration = parseInt(this.audio.duration)
        this.remainTime = this.duration
      }
    },

    stopPlay() {
      this.audio.load()
      this.onPlaying = false
      this.loaded = false
    },

    end() {
      setTimeout(() => {
        this.onTouching = false
      }, 100)
    }
  }
}
</script>

<style lang="less" scoped>
.player{
  width: 5.5rem;
  height: 45px;
  margin-left: 5px;
  transition: .05s all linear;
  background-color: #ffd500;
  box-shadow: 0 0 5px 1px rgba(255, 213, 0, 0.6);
  border-radius: 5px;
  color: #fff;
  div{
    display: inline-block;
    line-height: 45px;
    vertical-align: top;
  }
  .loading{
    width: 25px;
    height: 25px;
    display: inline-block;
    position: absolute;
    border-radius: 50%;
    border-width: 3px;
    border-style: solid;
    border-color: #ff9000 #ff9000 #ff9000 #ffc600;
    margin: 10px 0 0 15px;
    animation: spin 1s infinite linear;
  }
  .volume{
    width: 1.1rem;
    height: 45px;
    position: relative;
    span{
      display: inline-block;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      opacity: 1
    }
    .dot{
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #fff;
      left: 15px;
    }
    .arc1{
      border-radius: 50%;
      width: 20px;
      height: 20px;
      border-width: 3px;
      border-style: solid;
      border-color: transparent #fff transparent transparent;
      left: 6px;
    }
    .aniArc1{
      animation: arc1 1.5s infinite linear;
    }
    .arc2{
      border-radius: 50%;
      width: 30px;
      height: 30px;
      border-width: 3px;
      border-style: solid;
      border-color: transparent #fff transparent transparent;
      left: 3px;
    }
    .aniArc2{
      animation: arc2 1.5s infinite linear;
    }
  }
  .word{
    width: 3.3rem;
  }
}
.onTouching{
  background-color: #ffe24c;
}
@keyframes arc1 {
  0%{
    opacity: 0;
  }
  40%{
    opacity: 1;
  }
}
@keyframes arc2 {
  0%{
    opacity: 0;
  }
  80%{
    opacity: 1;
  }
}
@keyframes spin{
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
</style>
