import React, { Fragment } from 'react'
import createReactClass from 'create-react-class'
import { withStyles, Button } from '@material-ui/core'
import _ from 'lodash'
import Select from '../select'
import Table from '../table'

const TableView = createReactClass({
  displayName: 'TableView',
  propTypes: {},
  getDefaultProps () {
    return {
      rows: [],
      columns: []
    }
  },
  getInitialState () {
    return {
      selectedValue: {},
      selectArray: {},
      rows: this.props.rows,
      columns: this.props.columns,
      selectType: ['genre', 'Rating']
    }
  },
  componentDidMount () {
    const { selectArray, selectType } = this.state
    const { rows } = this.props
    selectType.forEach((type) => {
      selectArray[type] = _.orderBy(_.uniq(_.map(rows, type.toLowerCase())))
    })
    this.setState({ selectArray })
  },
  render () {
    const { classes } = this.props
    const { selectedValue, selectArray, rows, columns, selectType } = this.state
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
                  onChange={(event) => {
                    const {target: {value, name} = {}} = event
                    if (!selectedValue[name]) selectedValue[name] = value
                    else selectedValue[name] = [...value]
                    let tempRows = this.props.rows
                    selectType.forEach((type) => {
                      const selected = selectedValue[type]
                      if (!selected) return
                      tempRows = tempRows.filter((row) => selected.includes(row[type.toLowerCase()]))
                    })
                    this.setState({ selectedValue, rows: tempRows })
                  }}
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
