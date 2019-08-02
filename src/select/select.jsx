import React from 'react'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types'
import { Select, MenuItem, InputLabel } from '@material-ui/core'

export default createReactClass({
  displayName: 'Select',
  propTypes: {
    items: PropTypes.array,
    label: PropTypes.string
  },
  getDefaultProps () {
    return {
      items: []
    }
  },
  render () {
    const { items, label, style, ...rest } = this.props
    const customStyle = { display: 'flex', flexDirection: 'column' }
    return (
      <div style={style || customStyle}>
        <InputLabel style={{ fontSize: 12 }}>{label}</InputLabel>
        <Select fullWidth {...rest}>
          {items.map(x => (
            <MenuItem key={x} value={x}>
              {x}
            </MenuItem>
          ))}
        </Select>
      </div>
    )
  }
})
