<template>
  <div class="error-container">
    <div class="error-content">
      <div class="error-subtitle">找不到网页！</div>
      <div class="error-info">对不起，您正在寻找的页面不存在。请检查URL是否正确，或返回首页。</div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.error-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.error-content {
  text-align: center;
}

.error-subtitle {
  font-size: 20px;
  color: #222;
  margin-bottom: 16px;
}
.error-info {
  font-size: 14px;
  color: #888;
  margin-bottom: 28px;
}
</style>
