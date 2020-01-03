const os = (() => {
  const ua = navigator.userAgent,
    isAndroid = /(?:Android)/.test(ua),
    isFireFox = /(?:Firefox)/.test(ua),
    isPad = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
    isiPad = /(?:iPad)/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1), // for ios 13 ipad
    isiPhone = /(?:iPhone)/.test(ua) && !isPad,
    isPC = !isiPhone && !isAndroid && !isPad && !isiPad
  return {
    isPad,
    isiPhone,
    isAndroid,
    isPC,
    isiPad
  }
})()
    