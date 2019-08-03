import React, { Fragment } from 'react'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types'
import { withStyles, Button } from '@material-ui/core'
import _ from 'lodash'
import Select from '../select'
import Table from '../table'

const TableView = createReactClass({
  displayName: 'TableView',
  propTypes: {
    selectType: PropTypes.array
  },
  getDefaultProps () {
    return {
      rows: []
    }
  },
  getInitialState () {
    return {
      selectedValue: {},
      selectArray: {},
      rows: this.props.rows
    }
  },
  componentDidMount () {
    const { selectArray } = this.state
    const { rows, selectType } = this.props
    selectType.forEach((type) => {
      selectArray[type] = _.orderBy(_.uniq(_.map(rows, type.toLowerCase())))
    })
    this.setState({ selectArray })
  },
  handleChange: function (event) {
    const { selectType, rows } = this.props
    const { selectedValue } = this.state
    const {target: { value, name } = {}} = event
    if (!selectedValue[name]) selectedValue[name] = value
    else selectedValue[name] = [...value]
    let tempRows = rows
    selectType.forEach((type) => {
      const selected = selectedValue[type]
      if (!selected) return
      tempRows = tempRows.filter((row) => selected.includes(row[type.toLowerCase()]))
    })
    this.setState({ selectedValue, rows: tempRows })
  },
  render () {
    const { classes, columns } = this.props
    const { selectedValue, selectArray, rows } = this.state
    return (
      <Fragment>
        <div style={{ display: 'flex' }}>
          {
            Object.entries(selectArray).map(([key, value]) => {
              return (
                <Select
                  style={{ flex: 1, maxWidth: '250px', marginRight: '15px' }}
                  key={key}
                  items={value}
                  label={key}
                  name={key}
                  multiple
                  value={selectedValue[key] || []}
                  onChange={this.handleChange}
                />
              )
            })
          }
          {
            !!Object.keys(selectedValue).length && (
              <Button className={classes.button} onClick={() => {
                this.setState({ selectedValue: {}, rows: this.props.rows })
              }}>CLEAR FILTERS</Button>
            )
          }
        </div>
        <Table rows={rows} columns={columns} />
      </Fragment>
    )
  }
})

const styles = () => ({
  button: {
    color: '#ddd',
    backgroundColor: '#4b1aae',
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: '#4b1aae'
    }
  }
})

export default withStyles(styles)(TableView)
