import React from 'react'
import PropTypes from 'prop-types'

const photoStyle = {
  position: 'absolute',
  opacity: 0.5,
  transform: ' rotateY(180deg)',
  width: '100%',
  pointerEvents: 'none',
  top: 0,
}

function Item({ plainlink, remark, contributor, photo, date }) {
  return (
    <>
      <p>
        {'{{Label|danger|更新}} '}
        <span className="plainlinks">[[{plainlink}]]</span>
        {remark && <span className="beizhu">&nbsp;{remark}</span>}
      </p>
      {contributor && (
        <p>
          贡献者: {contributor}
          {date && <span className="time">{date}</span>}
        </p>
      )}
      <p style={photoStyle}>[[File:{photo}|350px]]</p>
    </>
  )
}

Item.propTypes = {
  plainlink: PropTypes.string.isRequired,
  remark: PropTypes.string,
  contributor: PropTypes.string,
  date: PropTypes.string,
  photo: PropTypes.string,
}

export default Item
