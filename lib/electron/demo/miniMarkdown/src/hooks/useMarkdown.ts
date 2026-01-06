import { ref, watchEffect, type Ref } from "vue";
import { rules } from "../rules";

export function useMarkdown(markdwonText: Ref<string, string>) {
  const markdownResult = ref<HTMLElement | null>(null); // 存储处理后的文本
  //  处理 markdown 文本

  watchEffect(() => {
    if (markdwonText.value) {
      let html = markdwonText.value;
      // 使用正则替换
      rules.forEach(([rule, template]) => {
        html = html.replace(rule, template);
      });
      markdownResult.value!.innerHTML = html;
    }
  });

  //  返回处理后的文本
  return markdownResult;
}
