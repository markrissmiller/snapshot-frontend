import React, { useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux'
import useStyles from './styles'

import { getPosts } from './actions/posts'
import Posts from './components/Posts/Posts'
import Form from './components/Form/Form'






const  App = () =>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const [currentId, setCurrentId ] = useState(null)

    const [quote, setQuote] = useState([])

    const quoteApiCall = async () => {
        try {
            const res = await fetch('https://type.fit/api/quotes')
            const data = await res.json()
           
            setQuote(data)
            console.log(data)
        } catch (error) {
            console.log(error.message)
        }
        
    }

        
    const selectedQuote = quote[Math.floor(Math.random() * quote.length)]
        
    
    useEffect(() => {
        dispatch(getPosts())
        quoteApiCall()
        
    },[currentId, dispatch])
   console.log(quote)
    return(
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant='h2' align="center">SNAPSHOT</Typography> <br/>
                <Typography >{selectedQuote ? `${selectedQuote.text} -${selectedQuote.author}` : ''}</Typography>
            </AppBar>
            <Grow in> 
                <Container>
                    <Grid container className={classes.mainContainer} justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts  setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App