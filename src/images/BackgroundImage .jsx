import React from 'react';
import Grid from '@mui/material/Grid';

const BackgroundImage = () => (
    <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
            backgroundImage: 'url(https://opulencecharters.com/wp-content/uploads/2023/08/pexels-cottonbro-studio-4606397-min.webp)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
    />
);

export default BackgroundImage;
