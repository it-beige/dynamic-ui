export default {
  name: 'DescriptionsRow',
  props: {
    row: {
      type: Array
    }
  },
  inject: ['dyDescriptions'],
  render (h) {
    const { dyDescriptions } = this;
    const row = (this.row || []).map(item => {
      return {
        ...item,
        label: item.slots.label || item.props.label,
        ...['labelClassName', 'contentClassName', 'labelStyle', 'contentStyle'].reduce((res, key) => {
          res[key] = item.props[key] || dyDescriptions[key];
          return res;
        }, {})
      };
    });
    if (dyDescriptions.direction === 'vertical') {
      return (
        <tbody>
          <tr class="dy-descriptions-row">
            {
              row.map(item => {
                return (
                  <th
                    class={{
                      'dy-descriptions-item__cell': true,
                      'dy-descriptions-item__label': true,
                      'has-colon': dyDescriptions.border ? false : dyDescriptions.colon,
                      'is-bordered-label': dyDescriptions.border,
                      [item.labelClassName]: true
                    }}
                    style={item.labelStyle}
                    colSpan={item.props.span}
                  >{item.label}</th>
                );
              })
            }
          </tr>
          <tr class="dy-descriptions-row">
            {
              row.map(item =>{
                return (
                  <td
                    class={['dy-descriptions-item__cell', 'dy-descriptions-item__content', item.contentClassName]}
                    style={item.contentStyle}
                    colSpan={item.props.span}
                  >{item.slots.default}</td>
                );
              })
            }
          </tr>
        </tbody>
      );
    }
    if (dyDescriptions.border) {
      return (
        <tbody>
          <tr class="dy-descriptions-row">
            {
              row.map(item=> {
                return ([
                  <th
                    class={{
                      'dy-descriptions-item__cell': true,
                      'dy-descriptions-item__label': true,
                      'is-bordered-label': dyDescriptions.border,
                      [item.labelClassName]: true
                    }}
                    style={item.labelStyle}
                    colSpan="1"
                  >{item.label}</th>,
                  <td
                    class={['dy-descriptions-item__cell', 'dy-descriptions-item__content', item.contentClassName]}
                    style={item.contentStyle}
                    colSpan={item.props.span * 2 - 1}
                  >{item.slots.default}</td>
                ]);
              })
            }
          </tr>
        </tbody>
      );
    }
    return (
      <tbody>
        <tr class="dy-descriptions-row">
          {
            row.map(item=> {
              return (
                <td class="dy-descriptions-item dy-descriptions-item__cell" colSpan={item.props.span}>
                  <div class="dy-descriptions-item__container">
                    <span
                      class={{
                        'dy-descriptions-item__label': true,
                        'has-colon': dyDescriptions.colon,
                        [item.labelClassName]: true
                      }}
                      style={item.labelStyle}
                    >{item.label}</span>
                    <span
                      class={['dy-descriptions-item__content', item.contentClassName]}
                      style={item.contentStyle}
                    >{item.slots.default}</span>
                  </div>
                </td>);
            })
          }
        </tr>
      </tbody>
    );
  }
};
