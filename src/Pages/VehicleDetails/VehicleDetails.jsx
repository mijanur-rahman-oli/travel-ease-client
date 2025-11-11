import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';

const VehicleDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/vehicles/${id}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('API Response:', data);
        if (data.success && data.result) {
          setVehicle(data.result);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to load vehicle details');
        setLoading(false);
      });
  }, [user, id]);

  const handleBookNow = () => {
    if (!vehicle) return;

    // Check if user is trying to book their own vehicle
    if (vehicle.userEmail === user.email) {
      toast.error("You cannot book your own vehicle!");
      return;
    }

    setBookingLoading(true);

    const bookingData = {
      vehicleId: vehicle._id,
      vehicleName: vehicle.vehicleName,
      category: vehicle.category,
      pricePerDay: vehicle.pricePerDay,
      location: vehicle.location,
      owner: vehicle.owner,
      ownerEmail: vehicle.userEmail,
      coverImage: vehicle.coverImage,
      bookedBy: user.email,
      bookedByName: user.displayName || user.email,
      bookingDate: new Date().toISOString(),
      status: 'pending',
    };

    fetch(`http://localhost:3000/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(bookingData),
    })
      .then((res) => res.json())
      .then((data) => {
        setBookingLoading(false);
        if (data.success && data.insertedId) {
          Swal.fire({
            title: 'Booking Successful!',
            html: `
              <div class="text-center">
                <div class="text-6xl mb-4">🎉</div>
                <p class="text-lg mb-2">Your ride request has been submitted!</p>
                <p class="text-sm text-gray-600">Booking ID: ${data.insertedId}</p>
              </div>
            `,
            icon: 'success',
            confirmButtonColor: '#ec4899',
            confirmButtonText: 'View My Bookings',
            showCancelButton: true,
            cancelButtonText: 'Stay Here',
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/my-bookings'); // Navigate to bookings page if you have one
            }
          });
        } else {
          toast.error(data.message || 'Booking failed. Please try again.');
        }
      })
      .catch((err) => {
        console.error(err);
        setBookingLoading(false);
        toast.error('Something went wrong. Please try again.');
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 border-8 border-base-300 rounded-full"></div>
            <div className="absolute inset-0 border-8 border-pink-500 rounded-full border-t-transparent animate-spin"></div>
            <div className="absolute inset-4 border-8 border-purple-500 rounded-full border-b-transparent animate-spin animation-delay-150" style={{ animationDirection: 'reverse' }}></div>
          </div>
          <p className="text-base-content text-lg font-semibold animate-pulse">Loading vehicle details...</p>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <div className="text-center bg-base-100 p-10 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300">
          <div className="text-7xl mb-4 animate-bounce">🚗</div>
          <h2 className="text-3xl font-bold text-base-content mb-3">Vehicle Not Found</h2>
          <p className="text-base-content/70 mb-6">The vehicle you're looking for doesn't exist.</p>
          <Link to="/all-vehicles" className="btn bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0 shadow-lg">
            ← Back to Vehicles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4">

        <Link
          to="/all-vehicles"
          className="inline-flex items-center gap-2 text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 font-semibold mb-6 group transition-all duration-300"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
          <span>Back to Vehicles</span>
        </Link>


        <div className="bg-base-100 rounded-3xl shadow-2xl overflow-hidden transform hover:shadow-3xl transition-all duration-500 animate-fade-in">
          <div className="md:flex">

            <div className="md:w-1/2 relative overflow-hidden group">
              <img
                src={vehicle?.coverImage || 'https://via.placeholder.com/600x400?text=No+Image'}
                alt={vehicle?.vehicleName || 'Vehicle'}
                className={`w-full h-72 md:h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 bg-base-200 animate-pulse"></div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                <span className="badge bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 px-4 py-3 text-xs font-bold shadow-lg animate-slide-in-right">
                  {vehicle?.category || 'N/A'}
                </span>
                <span className={`badge ${vehicle?.availability === 'Available'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                    : 'bg-gradient-to-r from-red-500 to-rose-600'
                  } text-white border-0 px-4 py-3 text-xs font-bold shadow-lg animate-slide-in-right animation-delay-100`}>
                  {vehicle?.availability || 'Unknown'}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-pink-500/20 to-transparent rounded-tr-full"></div>
            </div>

            <div className="md:w-1/2 p-8 space-y-6">
              <div className="animate-slide-in-left">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-400 bg-clip-text text-transparent mb-4 leading-tight">
                  {vehicle?.vehicleName || 'Unknown Vehicle'}
                </h1>
              </div>

              <div className="space-y-3 animate-slide-in-left animation-delay-100">
                <div className="flex items-center gap-3 p-3 bg-base-200 rounded-xl hover:bg-base-300 transition-colors duration-300 group">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">👤</span>
                  <div className="flex-1">
                    <p className="text-xs text-base-content/60 font-medium">Owner</p>
                    <p className="text-sm font-bold text-base-content">{vehicle?.owner || 'N/A'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-base-200 rounded-xl hover:bg-base-300 transition-colors duration-300 group">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">📍</span>
                  <div className="flex-1">
                    <p className="text-xs text-base-content/60 font-medium">Location</p>
                    <p className="text-sm font-bold text-base-content">{vehicle?.location || 'Not specified'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-base-200 rounded-xl hover:bg-base-300 transition-colors duration-300 group">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">✉️</span>
                  <div className="flex-1">
                    <p className="text-xs text-base-content/60 font-medium">Contact</p>
                    <p className="text-sm font-bold text-pink-600 dark:text-pink-400">{vehicle?.userEmail || 'Not provided'}</p>
                  </div>
                </div>
              </div>


              <div className="animate-slide-in-left animation-delay-200">
                <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <p className="text-4xl font-black relative z-10">
                    ${vehicle?.pricePerDay || 0}
                    <span className="text-sm font-normal opacity-90 ml-2">/day</span>
                  </p>
                </div>
              </div>


              <div className="animate-slide-in-left animation-delay-300">
                <div className="bg-base-200 p-5 rounded-xl">
                  <h3 className="text-sm font-bold text-base-content mb-2 flex items-center gap-2">
                    <span className="text-lg">📝</span> Description
                  </h3>
                  <p className="text-base-content/80 text-sm leading-relaxed">
                    {vehicle?.description || 'No description available'}
                  </p>
                </div>
              </div>


              <div className="flex gap-3 animate-slide-in-left animation-delay-400">
                {vehicle?.availability === 'Available' ? (
                  <>
                    <button
                      onClick={handleBookNow}
                      disabled={bookingLoading}
                      className="flex-1 btn bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0 text-sm font-bold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {bookingLoading ? (
                        <>
                          <span className="loading loading-spinner loading-sm"></span>
                          Processing...
                        </>
                      ) : (
                        <>
                          <span className="text-lg">🚗</span> Book Now
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleBookNow}
                      disabled={bookingLoading}
                      className="flex-1 btn bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white border-0 text-sm font-bold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {bookingLoading ? (
                        <>
                          <span className="loading loading-spinner loading-sm"></span>
                          Processing...
                        </>
                      ) : (
                        <>
                          <span className="text-lg">📋</span> Request Ride
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  <button disabled className="w-full btn bg-base-300 text-base-content/50 border-0 cursor-not-allowed text-sm">
                    <span className="text-lg">🚫</span> Currently Unavailable
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-base-100 p-6 rounded-2xl shadow-lg text-center transform hover:scale-110 hover:rotate-2 transition-all duration-300 animate-fade-in-up">
            <div className="text-4xl mb-3 animate-bounce">🛡️</div>
            <p className="text-xs font-bold text-base-content">Fully Insured</p>
            <p className="text-xs text-base-content/60 mt-1">Safe & Secure</p>
          </div>
          <div className="bg-base-100 p-6 rounded-2xl shadow-lg text-center transform hover:scale-110 hover:rotate-2 transition-all duration-300 animate-fade-in-up animation-delay-100">
            <div className="text-4xl mb-3 animate-bounce animation-delay-100">⏰</div>
            <p className="text-xs font-bold text-base-content">24/7 Support</p>
            <p className="text-xs text-base-content/60 mt-1">Always Available</p>
          </div>
          <div className="bg-base-100 p-6 rounded-2xl shadow-lg text-center transform hover:scale-110 hover:rotate-2 transition-all duration-300 animate-fade-in-up animation-delay-200">
            <div className="text-4xl mb-3 animate-bounce animation-delay-200">💳</div>
            <p className="text-xs font-bold text-base-content">Easy Payment</p>
            <p className="text-xs text-base-content/60 mt-1">Multiple Options</p>
          </div>
        </div>

        <div className="fixed top-20 right-10 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl animate-float pointer-events-none"></div>
        <div className="fixed bottom-20 left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-float animation-delay-300 pointer-events-none"></div>
      </div>


    </div>
  );
};

export default VehicleDetails;