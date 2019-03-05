import React from 'react'
import PropTypes from 'prop-types'
import Item from './Item'

/**
 * more update link
 * @param {string} link
 */
function More({ link, text = '查看更多更新' }) {
  return (
    <span style={{ float: 'right' }} className="plainlinks">
      [{link} {text}&gt;&gt;]
    </span>
  )
}

More.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string,
}

function NewestItems({ items, more }) {
  return (
    <div
      style={{
        height: '390px',
        padding: '0 10px',
        overflow: 'auto',
        overflowX: 'hidden',
        overflowY: 'auto',
      }}
    >
      <templatestyles src="最新词条/2/styles.css" />
      <div>
        <table width="100%">
          {items.length ? (
            items.map((props, index) => (
              <tr key={index}>
                <td className="left" style={{ position: 'relative' }}>
                  <Item {...props} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="left" style={{ position: 'relative' }}>
                暂无重要更新
              </td>
            </tr>
          )}
          <tr id="more-tr">
            <td id="more-td">
              <More link={more} />
            </td>
          </tr>
        </table>
      </div>
    </div>
  )
}

NewestItems.propTypes = {
  items: PropTypes.array.isRequired,
  more: PropTypes.string.isRequired,
}

function App(data) {
  return <NewestItems {...data} />
}

export default App
