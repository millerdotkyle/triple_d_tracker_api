'use strict';
const router = require('express').Router();
const authController = require('../controllers/authController');
const ctrlLocations = require('../controllers/locationsController');
// const ctrlDetail = require('../controllers/locationDetailController');

// passport - BEGIN
const passportService = require('../services/passport');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false} );       // jwtStrategy
const requireSignin = passport.authenticate('local', { session: false } );  // localStrategyu
// passport - END

// authentication - BEGIN
router.post('/signup', authController.signup);
router.post('/signin', requireSignin, authController.signin);
// authentication - END

// locations
// router.get('/locations', ctrlLocations.getAllLocations); // w/o auth
router.get('/locations', requireAuth, ctrlLocations.getAllLocations); // with auth
// router.get('/locations/:state', requireAuth, ctrlLocations.getLocationsByState);
// router.get('/locations/nearme', requireAuth, ctrlLocations.getLocationsNearMe);

// detail
// router.get('/location/:locationId', requireAuth, ctrlDetail.getLocationDetail);

// // events
// router.get('/events', requireAuth, ctrlEvents.getTastingEvents);
// router.post('/events', requireAuth, ctrlEvents.postTastingEventData);
// router.delete('/events/:eventId', requireAuth, ctrlEvents.deleteEvent);
// router.get('/events/edit/:eventId', requireAuth, ctrlEvents.getOneTastingEvent); // for Edit Event Form.
// router.put('/events/edit/:eventId', requireAuth, ctrlEvents.putTastingEventData); // for Edit Event Form.
//
// // tastings
// router.get('/tastings/:eventId', requireAuth, ctrlTastings.getTastingNotes);
// router.post('/tastings/:eventId', requireAuth, ctrlTastings.postTastingNoteData);
// router.delete('/tastings/:tastingId', requireAuth, ctrlTastings.deleteTastingNote);
// router.get('/tastings/edit/:tastingId', requireAuth, ctrlTastings.getOneTastingNote); // for Edit Tasting Note Form.
// router.put('/tastings/edit/:tastingId', requireAuth, ctrlTastings.putTastingNoteData); // for Edit Tasting Note Form.
//
// // search
// router.post('/search', requireAuth, ctrlSearch.postTastingNotesSearchData);


module.exports = router;