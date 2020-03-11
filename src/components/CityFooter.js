import React from 'react'
import { Link as GbLink } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic'
import MailOutlineIcon from '@material-ui/icons/MailOutline'

const icons = {
  headset: HeadsetMicIcon,
  mail: MailOutlineIcon,
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.common.black,
  },
  link: {
    color: theme.palette.common.white,
    textDecoration: 'none',
    marginBottom: 10,
  },
  linksSection: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '12px',
    marginTop: theme.spacing(3),
  },
  sectionTitle: {
    color: theme.palette.common.white,
    marginBottom: theme.spacing(3),
  },
  iconLinks: {
    margin: theme.spacing(3, 0),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    color: theme.palette.common.white,
  },
  [theme.breakpoints.down('sm')]: {
    iconLinks: {
      margin: theme.spacing(1, 0),
    },
    linksSection: {
      marginTop: theme.spacing(1),
    },
    sectionTitle: {
      marginBottom: theme.spacing(1),
    },
  },
}))

const data = getData()

const LinkTo = props => {
  const classes = useStyles()

  if (!props.link.startsWith('/')) {
    return (
      <Link href={props.link} className={classes.link}>
        {props.text}
      </Link>
    )
  }
  return (
    <GbLink to={props.link} className={classes.link}>
      {props.text}
    </GbLink>
  )
}

const CityFooter = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Grid container>
          <Box component={Grid} item width="100%" display="flex" flexDirection="column" alignItems="center" pt={3}>
            <Typography style={{ color: '#fff' }}>{data.title}</Typography>
            <Typography style={{ color: '#fff' }}>{data.schedule}</Typography>
          </Box>
          <Grid item container xs={12}>
            {data.actions.map((link, i) => {
              const Icon = icons[link.icon]
              return (
                <Grid item xs={12} sm key={i}>
                  <Box component={Link} href={link.link} className={classes.iconLinks}>
                    <Icon />
                    <Typography style={{ color: '#fff' }}>{link.text}</Typography>
                  </Box>
                </Grid>
              )
            })}
          </Grid>
          <Grid item xs={12}>
            <Divider style={{ backgroundColor: '#fff' }} />
          </Grid>
          <Grid item container xs={12} spacing={2}>
            {data.sections.map(({ title, actions }, i) => (
              <Grid item xs={12} sm key={i} className={classes.linksSection}>
                <Box component={Typography} variant="subtitle2" className={classes.sectionTitle}>
                  {title}
                </Box>
                {actions.map((link, i) => (
                  <LinkTo {...link} key={i} />
                ))}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default CityFooter

function getData() {
  return {
    title: 'Wir helfen, wenn Sie umziehen wollen.',
    schedule: 'Mo - Fr: 07:30 - 21:00 | Sa: 08:00 - 18:00',
    actions: [
      { link: 'tel:+49 30 76758002', text: '+49 30 76758002', icon: 'headset' },
      {
        link: 'mailto:service@movinga.de',
        text: 'service@movinga.de',
        icon: 'mail',
      },
    ],
    sections: [
      {
        title: 'Wer wir sind',
        actions: [
          { text: 'Über Uns', link: 'https://www.movinga.de/uber-uns' },
          { text: 'Unsere Kunden', link: 'https://www.movinga.de/bewertungen' },
          { text: 'Karriere', link: 'https://careers.movinga.com' },
          { text: 'Presse', link: 'https://www.movinga.de/presse' },
        ],
      },
      {
        title: 'Nützliche Informationen',
        actions: [
          {
            text: 'Tipps & News von Movinga',
            link: 'https://www.movinga.de/hub/',
          },
          {
            text: 'Was kostet ein Umzug?',
            link: 'https://www.movinga.de/hub/beratung/umzugskosten/',
          },
          {
            text: 'Checkliste für Ihren Umzug',
            link: 'https://www.movinga.de/hub/beratung/umzug-checkliste/',
          },
          {
            text: 'Umzug mit Hartz IV',
            link: 'https://www.movinga.de/hub/beratung/umzug-hartz-iv/',
          },
          {
            text: 'Umzugsunternehmen',
            link: 'https://www.movinga.de/umzugsunternehmen/',
          },
          {
            text: 'Umzugskostenpauschale 2018/2019',
            link: 'https://www.movinga.de/hub/beratung/umzugskostenpauschale/',
          },
        ],
      },
      {
        title: 'Ihr neues Zuhause',
        actions: [
          { text: 'Umzug Berlin', link: 'https://www.movinga.de/umzug/berlin' },
          {
            text: 'Umzug München',
            link: 'https://www.movinga.de/umzug/muenchen',
          },
          { text: 'Umzug Hamburg', link: 'https://www.movinga.de/umzug/hamburg' },
          { text: 'Umzug Köln', link: 'https://www.movinga.de/umzug/koeln' },
          {
            text: 'Umzug Düsseldorf',
            link: 'https://www.movinga.de/umzug/duesseldorf',
          },
          {
            text: 'Umzug Frankfurt',
            link: 'https://www.movinga.de/umzug/frankfurt',
          },
          {
            text: 'Umzug Dortmund',
            link: 'https://www.movinga.de/umzug/dortmund',
          },
        ],
      },
      {
        title: 'Allgemeine Informationen',
        actions: [
          { text: 'FAQ / Hilfe', link: 'https://www.movinga.de/faq' },
          {
            text: 'Partner werden',
            link: 'https://www.movinga.de/partnerschaften',
          },
          { text: 'Impressum', link: 'https://www.movinga.de/impressum' },
          { text: 'AGB', link: 'https://www.movinga.de/agb' },
          {
            text: 'Datenschutzerklärung',
            link: 'https://www.movinga.de/datenschutzerklaerung',
          },
        ],
      },
    ],
  }
}
