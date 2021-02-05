import { Component, Part, Prop } from '@mdi/element';

import template from './basic.html';

@Component({
  selector: 'x-modification-basic',
  template
})
export default class XModificationBasic extends HTMLElement {
/*
var modification = document.getElementById('modification');
      modification.modifications = modifications;
      modification.addEventListener('edit', (e) => {
        console.log(e.detail);
      });
      var editToggle = document.getElementById('editToggle');
      editToggle.addEventListener('click', () => {
        modification.edit = !modification.edit;
      });
      var modificationClear = document.getElementById('modificationClear');
      modificationClear.addEventListener('click', () => {
        modification.modifications = [];
      });
      var modificationSingle = document.getElementById('modificationSingle');
      var increment = 0;
      modificationSingle.addEventListener('click', () => {
        increment++;
        modification.modifications = [...modification.modifications, {
            "id": "3e7a0e1b-b355-11e7-bf5c-94188269ec50" + increment,
            "modificationId": "B4DEB3A8-A146-4086-9D7B-B67842A9CCB8",
            "packageId": "38EF63D0-4744-11E4-B3CF-842B2B6CFE1B",
            "iconNameBefore": null,
            "iconNameAfter": null,
            "iconDescriptionBefore": null,
            "iconDescriptionAfter": null,
            "iconDataBefore": null,
            "iconDataAfter": null,
            "text": "Example `"  + increment + `"`,
            "date": "2020-10-20T16:07:15Z",
            "user": {
                "id": "c4ea5584-07e3-11e4-bf19-842b2b6cfe1b",
                "name": "Austin Andrews",
                "github": "templarian",
                "twitter": "Templarian"
            },
            "icon": null,
            "version": {
                "major": 1,
                "minor": 0,
                "patch": 42
            },
            "issue": null
        }];
      });
*/
}