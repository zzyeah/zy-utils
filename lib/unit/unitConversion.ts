enum UnitMapKeys {
  X = "width",
  Y = "height",
}

export class UnitConversion {
  protected DPIs: Map<UnitMapKeys, number> = new Map();

  constructor() {
    this.DPIs = this.getDPIs();
  }

  getDPIs(): Map<UnitMapKeys, number> {
    const dpis: Map<UnitMapKeys, number> = new Map();
    if (window && window.devicePixelRatio) {
      // 获取屏幕宽度和高度（像素）
      const screenWidthPx = window.screen.width;
      const screenHeightPx = window.screen.height;

      // 获取屏幕物理尺寸（英寸）
      const screenWidthInches = window.screen.width / window.devicePixelRatio;
      const screenHeightInches = window.screen.height / window.devicePixelRatio;

      // 计算每英寸像素数（PPI）
      const ppiX = screenWidthPx / screenWidthInches;
      const ppiY = screenHeightPx / screenHeightInches;

      // 将 PPI 转换为 DPI（通常 PPI 和 DPI 相同）
      dpis.set(UnitMapKeys.X, Math.floor(ppiX));
      dpis.set(UnitMapKeys.Y, Math.floor(ppiY));
    } else {
      const tempNode = document.createElement("div");
      tempNode.style.cssText =
        "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
      document.body.appendChild(tempNode);
      const { offsetWidth, offsetHeight } = tempNode;
      dpis.set(UnitMapKeys.X, Math.floor(offsetWidth));
      dpis.set(UnitMapKeys.Y, Math.floor(offsetHeight));
      document.body.removeChild(tempNode);
    }

    return dpis;
  }

  pxConversionMm(pixel: number): number {
    const dpiX = this.DPIs.get(UnitMapKeys.X);
    if (dpiX === undefined) {
      throw new Error("无法获取 X 方向的 DPI 值");
    }
    return (pixel / dpiX) * 25.4;
  }

  mmConversionPx(mm: number): number {
    const dpiX = this.DPIs.get(UnitMapKeys.X);
    if (dpiX === undefined) {
      throw new Error("无法获取 X 方向的 DPI 值");
    }
    return (mm / 25.4) * dpiX;
  }
}
