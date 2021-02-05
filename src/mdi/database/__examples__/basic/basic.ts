import { Component, Part, Prop } from '@mdi/element';

import template from './basic.html';

@Component({
  selector: 'x-database-basic',
  template
})
export default class XDatabaseBasic extends HTMLElement {
/*
      // Worker
      // Build a worker from an anonymous function body
      var blobURL = URL.createObjectURL( new Blob([ '(',
      function(){
        self.onmessage = function(e) {
          var { icons, term } = e.data;
          self.postMessage(icons.filter((icon) => {
            return icon.name === term;
          }));
        };
      }.toString(),
      ')()' ], { type: 'application/javascript' } ) ),

      worker = new Worker( blobURL );

      worker.onmessage = function(e) {
        console.log("Received: ", e.data);
      }

      // Won't be needing this anymore
      //URL.revokeObjectURL( blobURL );
      // Get Data
      const fontId = 'D051337E-BC7E-11E5-A4E9-842B2B6CFE1B';
      const database = document.getElementsByTagName('mdi-database')[0];
      database.addEventListener('sync', async (e) => {
        const { db } = e.detail;
        const count = await db.getCount(fontId);
        console.log('Total Icons', count);
        const icons = await db.getIcons(fontId);
        console.log('Icon Objects:', icons.length);

        worker.postMessage({ icons, term: 'account' });
        window.getIcons = (count) => {
          if (count === -1) {
            return icons;
          }
          return icons.slice(0, count);
        };
        // Search
        const search = document.getElementById('search');
        search.icons = icons;
        // Init examples with icons
        document.getElementById('picker1').icons = getIcons(200);
        iconGrid.basic(10);
      });
      database.font = fontId;
      */
}