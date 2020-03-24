import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import InputBase from '@material-ui/core/InputBase'
import AdjustIcon from '@material-ui/icons/Adjust'
import RoomIcon from '@material-ui/icons/Room'
import DateRange from '@material-ui/icons/DateRange'
import MailIcon from '@material-ui/icons/MailOutline'
import PhoneIcon from '@material-ui/icons/PhoneIphone'
import PersonIcon from '@material-ui/icons/Person'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

const getDefaultDate = () => {
  const d = new Date()
  return `${d.getDay()}.${d.getMonth()}.${d.getFullYear()}`
}

const useStyles = makeStyles(theme => ({
  calMargin: {
    width: '100%',
    '&:first-child': {
      borderBottom: '1px solid #cdcdcd',
    },
    '& > input': {
      padding: theme.spacing(1),
    },
  },
  field: {
    width: '100%',
    '& > input': {
      padding: theme.spacing(1),
    },
  },
  fieldGroup: {
    marginTop: theme.spacing(2),
    border: '1px solid #cdcdcd',
    display: 'flex',
    backgroundColor: theme.palette.common.white,
  },
  button: {
    marginTop: theme.spacing(2),
  },
  fieldIcon: {
    padding: theme.spacing(0, 1),
    width: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > div': {
      height: '100%',
      '& > svg': {
        marginTop: 5,
        fill: theme.palette.secondary.main,
      },
    },
  },
}))

const LeadGen = () => {
  const classes = useStyles()

  return (
    <Container maxWidth="sm">
      <form method="post" action="#">
        <Typography variant="subtitle2">
          <Box mt={1}>Jetzt kostenloses Umzugsangebot erhalten</Box>
        </Typography>
        <Box className={classes.fieldGroup}>
          <Box className={classes.fieldIcon}>
            <div>
              <AdjustIcon fontSize="small" />
            </div>
            <div>
              <RoomIcon />
            </div>
          </Box>
          <Box width="100%">
            <InputBase
              className={classes.calMargin}
              inputProps={{ 'aria-label': 'naked', placeholder: 'Auszugsort' }}
            />
            <InputBase
              className={classes.calMargin}
              inputProps={{ 'aria-label': 'naked', placeholder: 'Einzugsort' }}
            />
          </Box>
        </Box>

        <Box className={classes.fieldGroup}>
          <Box className={classes.fieldIcon}>
            <div>
              <DateRange />
            </div>
          </Box>
          <Box width="100%">
            <InputBase
              className={classes.field}
              defaultValue={getDefaultDate()}
              inputProps={{ 'aria-label': 'naked' }}
            />
          </Box>
        </Box>

        <Box display="flex">
          <Box className={classes.fieldGroup} width="50%">
            <Box className={classes.fieldIcon}>
              <div>
                <PersonIcon />
              </div>
            </Box>
            <Box width="100%">
              <InputBase className={classes.field} inputProps={{ 'aria-label': 'naked', placeholder: 'Vorname' }} />
            </Box>
          </Box>
          <Box className={classes.fieldGroup} width="50%" ml={1}>
            <Box width="100%">
              <InputBase className={classes.field} inputProps={{ 'aria-label': 'naked', placeholder: 'Nachname' }} />
            </Box>
          </Box>
        </Box>

        <Box className={classes.fieldGroup}>
          <Box className={classes.fieldIcon}>
            <div>
              <MailIcon />
            </div>
          </Box>
          <Box width="100%">
            <InputBase className={classes.field} inputProps={{ 'aria-label': 'naked', placeholder: 'E-mail' }} />
          </Box>
        </Box>

        <Box className={classes.fieldGroup}>
          <Box className={classes.fieldIcon}>
            <div>
              <PhoneIcon />
            </div>
          </Box>
          <Box width="100%">
            <InputBase
              className={classes.field}
              inputProps={{
                'aria-label': 'naked',
                placeholder: '01512 3456789',
              }}
            />
          </Box>
        </Box>

        <Box className={classes.button}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            fullWidth
            type="submit"
            endIcon={<ChevronRightIcon />}
          >
            angebot berechnen
          </Button>
        </Box>

        <Typography component="div">
          <Box fontStyle="normal" fontSize="9px" my={2} textAlign="center" color="#9b9b9b">
            Ihre Daten werden nicht an Dritte weitergegeben. Ich bin einverstanden, dass Movinga mich anruft, um Details
            zu besprechen und ein unverbindliches Angebot zu erstellen.
          </Box>
        </Typography>
      </form>
    </Container>
  )
}

export default LeadGen
