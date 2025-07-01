import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Dog, Heart, Star, DollarSign, Bell, MessageCircle, Camera, MapPin, Phone, Mail, Settings, PlusCircle, Check, X } from 'lucide-react';

const VetSchedPlatform = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('login');
  const [bookings, setBookings] = useState([]);
  const [providers, setProviders] = useState([
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      type: "vet",
      specialty: "General Veterinary Care",
      rating: 4.9,
      price: 75,
      availability: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"],
      image: "🐕‍🦺",
      location: "downtown"
    },
    {
      id: 2,
      name: "Mike Johnson",
      type: "walker",
      specialty: "Active Dogs & Puppies",
      rating: 4.8,
      price: 20,
      availability: ["8:00 AM", "12:00 PM", "3:00 PM", "6:00 PM"],
      image: "🚶‍♂️",
      location: "park area"
    },
    {
      id: 3,
      name: "Dr. Emily Chen",
      type: "vet",
      specialty: "Emergency & Surgical Care",
      rating: 4.9,
      price: 95,
      availability: ["10:00 AM", "1:00 PM", "3:30 PM"],
      image: "⚕️",
      location: "medical center"
    }
  ]);
  const [pets, setPets] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Sample data initialization
  useEffect(() => {
    const sampleBookings = [
      {
        id: 1,
        petOwner: "John Doe",
        provider: "Dr. Sarah Wilson",
        service: "Checkup",
        date: "2025-07-01",
        time: "2:00 PM",
        status: "confirmed",
        amount: 75,
        pet: "Buddy"
      },
      {
        id: 2,
        petOwner: "Jane Smith",
        provider: "Mike Johnson",
        service: "30min Walk",
        date: "2025-06-30",
        time: "3:00 PM",
        status: "completed",
        amount: 20,
        pet: "Luna"
      }
    ];
    setBookings(sampleBookings);

    const samplePets = [
      {
        id: 1,
        name: "Buddy",
        breed: "Golden Retriever",
        age: 3,
        owner: "John Doe",
        allergies: "None",
        notes: "Very friendly, loves treats"
      },
      {
        id: 2,
        name: "Luna",
        breed: "Border Collie",
        age: 2,
        owner: "Jane Smith",
        allergies: "Chicken",
        notes: "High energy, needs slow introduction to new people"
      }
    ];
    setPets(samplePets);
  }, []);

  const LoginScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">🐾</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">VetSched</h1>
          <p className="text-gray-600">Pet Care Management Platform</p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => { setCurrentUser({type: 'owner', name: 'John Doe'}); setCurrentView('pet-owner'); }}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Heart className="w-5 h-5" />
            Login as Pet Owner
          </button>
          
          <button
            onClick={() => { setCurrentUser({type: 'vet', name: 'Dr. Sarah Wilson'}); setCurrentView('provider'); }}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <User className="w-5 h-5" />
            Login as Vet
          </button>
          
          <button
            onClick={() => { setCurrentUser({type: 'walker', name: 'Mike Johnson'}); setCurrentView('provider'); }}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Dog className="w-5 h-5" />
            Login as Dog Walker
          </button>
          
          <button
            onClick={() => { setCurrentUser({type: 'admin', name: 'Platform Admin'}); setCurrentView('admin'); }}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Settings className="w-5 h-5" />
            Admin Dashboard
          </button>
        </div>
      </div>
    </div>
  );

  const PetOwnerDashboard = () => {
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [bookingForm, setBookingForm] = useState({
      service: '',
      date: '',
      time: '',
      pet: '',
      notes: ''
    });

    const handleBooking = () => {
      const newBooking = {
        id: bookings.length + 1,
        petOwner: currentUser.name,
        provider: selectedProvider.name,
        service: bookingForm.service,
        date: bookingForm.date,
        time: bookingForm.time,
        status: 'confirmed',
        amount: selectedProvider.price,
        pet: bookingForm.pet
      };
      setBookings([...bookings, newBooking]);
      setSelectedProvider(null);
      setBookingForm({service: '', date: '', time: '', pet: '', notes: ''});
      alert('Booking confirmed! You will receive a confirmation SMS shortly.');
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🐾</div>
              <h1 className="text-xl font-bold">VetSched</h1>
            </div>
            <div className="flex items-center gap-4">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-600">Welcome, {currentUser.name}</span>
              <button onClick={() => setCurrentView('login')} className="text-sm text-blue-600 hover:underline">Logout</button>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Booking Section */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Book a Service
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {providers.map(provider => (
                  <div key={provider.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                       onClick={() => setSelectedProvider(provider)}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl">{provider.image}</div>
                      <div>
                        <h3 className="font-semibold">{provider.name}</h3>
                        <p className="text-sm text-gray-600">{provider.specialty}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm">{provider.rating}</span>
                      </div>
                      <span className="font-semibold text-green-600">${provider.price}</span>
                    </div>
                  </div>
                ))}
              </div>

              {selectedProvider && (
                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Book with {selectedProvider.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Service</label>
                      <select 
                        className="w-full border rounded-lg px-3 py-2"
                        value={bookingForm.service}
                        onChange={(e) => setBookingForm({...bookingForm, service: e.target.value})}
                      >
                        <option value="">Select service</option>
                        {selectedProvider.type === 'vet' ? (
                          <>
                            <option value="Checkup">General Checkup</option>
                            <option value="Vaccination">Vaccination</option>
                            <option value="Surgery">Surgery Consultation</option>
                          </>
                        ) : (
                          <>
                            <option value="30min Walk">30 Minute Walk</option>
                            <option value="60min Walk">60 Minute Walk</option>
                            <option value="Pet Sitting">Pet Sitting</option>
                          </>
                        )}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Pet</label>
                      <select 
                        className="w-full border rounded-lg px-3 py-2"
                        value={bookingForm.pet}
                        onChange={(e) => setBookingForm({...bookingForm, pet: e.target.value})}
                      >
                        <option value="">Select pet</option>
                        {pets.map(pet => (
                          <option key={pet.id} value={pet.name}>{pet.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Date</label>
                      <input 
                        type="date" 
                        className="w-full border rounded-lg px-3 py-2"
                        value={bookingForm.date}
                        onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Time</label>
                      <select 
                        className="w-full border rounded-lg px-3 py-2"
                        value={bookingForm.time}
                        onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
                      >
                        <option value="">Select time</option>
                        {selectedProvider.availability.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button 
                      onClick={handleBooking}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium"
                      disabled={!bookingForm.service || !bookingForm.date || !bookingForm.time || !bookingForm.pet}
                    >
                      Book Now - ${selectedProvider.price}
                    </button>
                    <button 
                      onClick={() => setSelectedProvider(null)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* My Pets */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  My Pets
                </h3>
                {pets.map(pet => (
                  <div key={pet.id} className="border-b pb-3 mb-3 last:border-b-0 last:pb-0 last:mb-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{pet.name}</span>
                      <span className="text-sm text-gray-500">({pet.breed})</span>
                    </div>
                    <p className="text-sm text-gray-600">Age: {pet.age} years</p>
                    {pet.allergies && pet.allergies !== 'None' && (
                      <p className="text-sm text-red-600">Allergies: {pet.allergies}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Recent Bookings */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recent Bookings
                </h3>
                {bookings.filter(b => b.petOwner === currentUser.name).slice(0, 3).map(booking => (
                  <div key={booking.id} className="border-b pb-3 mb-3 last:border-b-0 last:pb-0 last:mb-0">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium">{booking.service}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{booking.provider}</p>
                    <p className="text-sm text-gray-500">{booking.date} at {booking.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ProviderDashboard = () => {
    const [activeTab, setActiveTab] = useState('schedule');
    const providerBookings = bookings.filter(b => b.provider === currentUser.name);
    const todayBookings = providerBookings.filter(b => b.date === '2025-06-30');
    const totalEarnings = providerBookings.reduce((sum, b) => sum + b.amount, 0);

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🐾</div>
              <h1 className="text-xl font-bold">VetSched Pro</h1>
            </div>
            <div className="flex items-center gap-4">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-600">Welcome, {currentUser.name}</span>
              <button onClick={() => setCurrentView('login')} className="text-sm text-blue-600 hover:underline">Logout</button>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{todayBookings.length}</p>
                  <p className="text-sm text-gray-600">Today's Appointments</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">${totalEarnings}</p>
                  <p className="text-sm text-gray-600">Total Earnings</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center gap-3">
                <Star className="w-8 h-8 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">4.9</p>
                  <p className="text-sm text-gray-600">Average Rating</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center gap-3">
                <User className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{providerBookings.length}</p>
                  <p className="text-sm text-gray-600">Total Clients</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {['schedule', 'clients', 'earnings'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                      activeTab === tab 
                        ? 'border-blue-500 text-blue-600' 
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'schedule' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Today's Schedule</h3>
                  {todayBookings.length === 0 ? (
                    <p className="text-gray-500">No appointments today</p>
                  ) : (
                    <div className="space-y-3">
                      {todayBookings.map(booking => (
                        <div key={booking.id} className="border rounded-lg p-4 flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{booking.service} - {booking.pet}</h4>
                            <p className="text-sm text-gray-600">Client: {booking.petOwner}</p>
                            <p className="text-sm text-gray-500">{booking.time}</p>
                          </div>
                          <div className="flex gap-2">
                            <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm">
                              <Check className="w-4 h-4" />
                            </button>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                              <MessageCircle className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'clients' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Client Pets</h3>
                  <div className="space-y-3">
                    {pets.map(pet => (
                      <div key={pet.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{pet.name} ({pet.breed})</h4>
                          <span className="text-sm text-gray-500">Age: {pet.age}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Owner: {pet.owner}</p>
                        {pet.allergies && pet.allergies !== 'None' && (
                          <p className="text-sm text-red-600 mb-1">⚠️ Allergies: {pet.allergies}</p>
                        )}
                        <p className="text-sm text-gray-700">{pet.notes}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'earnings' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Earnings Overview</h3>
                  <div className="space-y-3">
                    {providerBookings.map(booking => (
                      <div key={booking.id} className="border rounded-lg p-4 flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{booking.service}</h4>
                          <p className="text-sm text-gray-600">{booking.petOwner} • {booking.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-600">${booking.amount}</p>
                          <p className="text-sm text-gray-500">{booking.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AdminDashboard = () => {
    const totalRevenue = bookings.reduce((sum, b) => sum + (b.amount * 0.05), 0); // 5% platform fee
    const totalUsers = providers.length + pets.length;
    const totalBookings = bookings.length;

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🐾</div>
              <h1 className="text-xl font-bold">VetSched Admin</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, {currentUser.name}</span>
              <button onClick={() => setCurrentView('login')} className="text-sm text-blue-600 hover:underline">Logout</button>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto p-6">
          {/* Platform Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">Platform Revenue</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3">
                <User className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{totalUsers}</p>
                  <p className="text-sm text-gray-600">Total Users</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{totalBookings}</p>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3">
                <Star className="w-8 h-8 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">{providers.length}</p>
                  <p className="text-sm text-gray-600">Active Providers</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Bookings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
              <div className="space-y-3">
                {bookings.slice(0, 5).map(booking => (
                  <div key={booking.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium">{booking.service}</span>
                      <span className="text-sm text-green-600">${booking.amount}</span>
                    </div>
                    <p className="text-sm text-gray-600">{booking.petOwner} → {booking.provider}</p>
                    <p className="text-sm text-gray-500">{booking.date} at {booking.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Providers */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Active Providers</h3>
              <div className="space-y-3">
                {providers.map(provider => (
                  <div key={provider.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium">{provider.name}</span>
                      <span className="text-sm text-blue-600 capitalize">{provider.type}</span>
                    </div>
                    <p className="text-sm text-gray-600">{provider.specialty}</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm">{provider.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">${provider.price}/service</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Platform Settings */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Platform Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg font-medium">
                Manage Providers
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg font-medium">
                View Analytics
              </button>
              <button className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg font-medium">
                Platform Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {currentView === 'login' && <LoginScreen />}
      {currentView === 'pet-owner' && <PetOwnerDashboard />}
      {currentView === 'provider' && <ProviderDashboard />}
      {currentView === 'admin' && <AdminDashboard />}
    </div>
  );
};

export default VetSchedPlatform;