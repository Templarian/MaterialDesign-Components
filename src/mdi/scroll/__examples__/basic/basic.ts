import { Component, Part, Prop } from '@mdi/element';

import template from './basic.html';

@Component({
  selector: 'x-scroll-basic',
  template
})
export default class XScrollBasic extends HTMLElement {
  /*
  var mdiScroll = document.getElementsByTagName('mdi-scroll')[0];
  var mdiScrollList = document.getElementById('mdiScrollList');
  var mdiScrollItems = [];
  var currentRow = 0;
  var currentViewHeight = 0;
  function dispatchHeight() {
    mdiScroll.height = mdiScrollItems.length * 44;
  }
  function small() {
    mdiScrollItems.splice(0, mdiScrollItems.length);
    for(var i = 0; i < 10; i++) {
      mdiScrollItems.push(`Test Item ${i}`);
    }
    dispatchHeight();
  }
  function large() {
    mdiScrollItems.splice(0, mdiScrollItems.length);
    for(var i = 0; i < 500; i++) {
      mdiScrollItems.push(`Test Item ${i}`);
    }
    dispatchHeight();
  }
  document.getElementById('small').addEventListener('click', small);
  document.getElementById('large').addEventListener('click', large);
  var list = [];
  function syncVirtual(virtualRows) {
    for (var i = list.length; i < virtualRows; i++) {
      var ele = document.createElement('button');
      ele.innerText = 'Placeholder';
      ele.style.height = '44px';
      mdiScrollList.appendChild(ele);
      list.push(ele);
    }
    list.forEach((e, i) => {
      e.style.display = i < virtualRows - 1 ? '' : 'none'
    });
  }
  mdiScroll.addEventListener('calculate', (e) => {
    var { offsetY, height, viewHeight } = e.detail;
    var viewRows = Math.ceil(viewHeight / 44) + 1;
    var row = Math.floor(offsetY / 44);
    syncVirtual(viewRows);
    if (currentRow !== row || currentViewHeight !== viewHeight) {
      document.getElementById('scrollCount').innerText = `${row}, ${viewRows}`;
      list.forEach((ele, index) => {
        ele.innerText = mdiScrollItems[index + row];
      });
      currentRow = row;
      currentViewHeight = viewHeight;
    }
    mdiScrollList.style.transform = `translateY(${-1 * offsetY % 44}px)`;
  });
  function overflow(overflowText) {
    var container = document.getElementById('overflowContainer');
    var overflowSpan = document.getElementById('overflow');
    if (overflowText === 'auto') {
      container.style.overflow = 'auto';
      container.style.height = '300px';
      overflowSpan.innerText = 'auto';
    } else {
      container.style.overflow = 'visible';
      container.style.height = '';
      overflowSpan.innerText = 'visible';
    }
  }
  overflow('auto');
  // overflow('visible');
  small();
  */
}