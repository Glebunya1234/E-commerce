"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { User, MapPin, Shield, Bell, Settings, Camera, Edit, Save, X, Plus, Trash2, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface UserProfile {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
  dateOfBirth: string
  gender: string
  avatar?: string
  bio: string
  joinDate: string
}

interface Address {
  id: string
  type: "home" | "work" | "other"
  name: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
}

interface NotificationSettings {
  orderUpdates: boolean
  promotions: boolean
  newsletter: boolean
  sms: boolean
  push: boolean
}

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [addresses, setAddresses] = useState<Address[]>([])
  const [notifications, setNotifications] = useState<NotificationSettings>({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    sms: false,
    push: true,
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null)
  const [showAddAddress, setShowAddAddress] = useState(false)
  const [newAddress, setNewAddress] = useState<Omit<Address, "id">>({
    type: "home",
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    isDefault: false,
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  useEffect(() => {
    if (!user) {
      router.push("/auth/login?redirect=/profile")
      return
    }

    // Mock profile data
    const mockProfile: UserProfile = {
      id: user.id,
      email: user.email,
      firstName: user.name.split(" ")[0] || "",
      lastName: user.name.split(" ")[1] || "",
      phone: "+1 (555) 123-4567",
      dateOfBirth: "1990-01-15",
      gender: "prefer-not-to-say",
      bio: "Love shopping for premium products and discovering new brands.",
      joinDate: "2023-06-15",
    }

    const mockAddresses: Address[] = [
      {
        id: "1",
        type: "home",
        name: "Home Address",
        address: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "United States",
        isDefault: true,
      },
      {
        id: "2",
        type: "work",
        name: "Office Address",
        address: "456 Business Ave",
        city: "New York",
        state: "NY",
        zipCode: "10002",
        country: "United States",
        isDefault: false,
      },
    ]

    setProfile(mockProfile)
    setEditedProfile(mockProfile)
    setAddresses(mockAddresses)
  }, [user, router])

  const handleProfileUpdate = () => {
    if (!editedProfile) return

    setProfile(editedProfile)
    setIsEditing(false)
    toast({
      title: "Profile updated!",
      description: "Your profile information has been saved successfully.",
    })
  }

  const handleAddressAdd = () => {
    if (!newAddress.name || !newAddress.address || !newAddress.city) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const address: Address = {
      ...newAddress,
      id: Date.now().toString(),
    }

    setAddresses((prev) => [...prev, address])
    setNewAddress({
      type: "home",
      name: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      isDefault: false,
    })
    setShowAddAddress(false)
    toast({
      title: "Address added!",
      description: "New address has been added to your account.",
    })
  }

  const handleAddressDelete = (id: string) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id))
    toast({
      title: "Address deleted",
      description: "Address has been removed from your account.",
    })
  }

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        variant: "destructive",
      })
      return
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      })
      return
    }

    // Simulate password change
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
    toast({
      title: "Password updated!",
      description: "Your password has been changed successfully.",
    })
  }

  const handleNotificationUpdate = (key: keyof NotificationSettings, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
    toast({
      title: "Notification settings updated",
      description: "Your preferences have been saved.",
    })
  }

  if (!user || !profile) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {profile.firstName.charAt(0)}
              {profile.lastName.charAt(0)}
            </div>
            <Button
              size="sm"
              className="absolute -bottom-2 -right-2 w-8 h-8 p-0 rounded-full bg-white border-2 border-gray-200 text-gray-600 hover:text-gray-900"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {profile.firstName} {profile.lastName}
            </h1>
            <p className="text-gray-600">{profile.email}</p>
            <Badge variant="secondary" className="mt-2">
              Member since {new Date(profile.joinDate).toLocaleDateString()}
            </Badge>
          </div>
        </div>
      </div>

      {/* Profile Tabs */}
      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        {/* Personal Information */}
        <TabsContent value="personal">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Personal Information
              </CardTitle>
              <Button
                variant={isEditing ? "destructive" : "outline"}
                onClick={() => {
                  if (isEditing) {
                    setEditedProfile(profile)
                  }
                  setIsEditing(!isEditing)
                }}
              >
                {isEditing ? <X className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={editedProfile?.firstName || ""}
                    onChange={(e) => setEditedProfile((prev) => (prev ? { ...prev, firstName: e.target.value } : null))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={editedProfile?.lastName || ""}
                    onChange={(e) => setEditedProfile((prev) => (prev ? { ...prev, lastName: e.target.value } : null))}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" value={profile.email} disabled className="bg-gray-50" />
                <p className="text-sm text-gray-500">Email cannot be changed. Contact support if needed.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={editedProfile?.phone || ""}
                  onChange={(e) => setEditedProfile((prev) => (prev ? { ...prev, phone: e.target.value } : null))}
                  disabled={!isEditing}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={editedProfile?.dateOfBirth || ""}
                    onChange={(e) =>
                      setEditedProfile((prev) => (prev ? { ...prev, dateOfBirth: e.target.value } : null))
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={editedProfile?.gender || ""}
                    onValueChange={(value) => setEditedProfile((prev) => (prev ? { ...prev, gender: value } : null))}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={editedProfile?.bio || ""}
                  onChange={(e) => setEditedProfile((prev) => (prev ? { ...prev, bio: e.target.value } : null))}
                  disabled={!isEditing}
                  rows={3}
                  placeholder="Tell us about yourself..."
                />
              </div>

              {isEditing && (
                <div className="flex gap-3">
                  <Button onClick={handleProfileUpdate} className="bg-gradient-to-r from-purple-600 to-pink-600">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Addresses */}
        <TabsContent value="addresses">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Saved Addresses
              </CardTitle>
              <Button onClick={() => setShowAddAddress(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Address
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {addresses.map((address) => (
                <Card key={address.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{address.name}</h3>
                          <Badge variant="secondary" className="capitalize">
                            {address.type}
                          </Badge>
                          {address.isDefault && <Badge className="bg-green-100 text-green-800">Default</Badge>}
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>{address.address}</p>
                          <p>
                            {address.city}, {address.state} {address.zipCode}
                          </p>
                          <p>{address.country}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddressDelete(address.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Add Address Form */}
              {showAddAddress && (
                <Card className="border-dashed">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-4">Add New Address</h3>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="addressName">Address Name</Label>
                          <Input
                            id="addressName"
                            value={newAddress.name}
                            onChange={(e) => setNewAddress((prev) => ({ ...prev, name: e.target.value }))}
                            placeholder="e.g., Home, Office"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="addressType">Type</Label>
                          <Select
                            value={newAddress.type}
                            onValueChange={(value: "home" | "work" | "other") =>
                              setNewAddress((prev) => ({ ...prev, type: value }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="home">Home</SelectItem>
                              <SelectItem value="work">Work</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="addressLine">Street Address</Label>
                        <Input
                          id="addressLine"
                          value={newAddress.address}
                          onChange={(e) => setNewAddress((prev) => ({ ...prev, address: e.target.value }))}
                          placeholder="123 Main Street"
                        />
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={newAddress.city}
                            onChange={(e) => setNewAddress((prev) => ({ ...prev, city: e.target.value }))}
                            placeholder="New York"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value={newAddress.state}
                            onChange={(e) => setNewAddress((prev) => ({ ...prev, state: e.target.value }))}
                            placeholder="NY"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">ZIP Code</Label>
                          <Input
                            id="zipCode"
                            value={newAddress.zipCode}
                            onChange={(e) => setNewAddress((prev) => ({ ...prev, zipCode: e.target.value }))}
                            placeholder="10001"
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="defaultAddress"
                          checked={newAddress.isDefault}
                          onCheckedChange={(checked) => setNewAddress((prev) => ({ ...prev, isDefault: checked }))}
                        />
                        <Label htmlFor="defaultAddress">Set as default address</Label>
                      </div>

                      <div className="flex gap-3">
                        <Button onClick={handleAddressAdd}>Add Address</Button>
                        <Button variant="outline" onClick={() => setShowAddAddress(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Change Password
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPasswords.current ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPasswords((prev) => ({ ...prev, current: !prev.current }))}
                    >
                      {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showPasswords.new ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPasswords((prev) => ({ ...prev, new: !prev.new }))}
                    >
                      {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showPasswords.confirm ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPasswords((prev) => ({ ...prev, confirm: !prev.confirm }))}
                    >
                      {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button onClick={handlePasswordChange} className="bg-gradient-to-r from-purple-600 to-pink-600">
                  Update Password
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                  </div>
                  <Button variant="outline">Enable 2FA</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Login Sessions</h3>
                    <p className="text-sm text-gray-600">Manage your active login sessions</p>
                  </div>
                  <Button variant="outline">View Sessions</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Download Your Data</h3>
                    <p className="text-sm text-gray-600">Get a copy of your account data</p>
                  </div>
                  <Button variant="outline">Download</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Order Updates</h3>
                    <p className="text-sm text-gray-600">Get notified about your order status changes</p>
                  </div>
                  <Switch
                    checked={notifications.orderUpdates}
                    onCheckedChange={(checked) => handleNotificationUpdate("orderUpdates", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Promotions & Deals</h3>
                    <p className="text-sm text-gray-600">Receive notifications about sales and special offers</p>
                  </div>
                  <Switch
                    checked={notifications.promotions}
                    onCheckedChange={(checked) => handleNotificationUpdate("promotions", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Newsletter</h3>
                    <p className="text-sm text-gray-600">Weekly newsletter with product updates and tips</p>
                  </div>
                  <Switch
                    checked={notifications.newsletter}
                    onCheckedChange={(checked) => handleNotificationUpdate("newsletter", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">SMS Notifications</h3>
                    <p className="text-sm text-gray-600">Receive important updates via text message</p>
                  </div>
                  <Switch
                    checked={notifications.sms}
                    onCheckedChange={(checked) => handleNotificationUpdate("sms", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Push Notifications</h3>
                    <p className="text-sm text-gray-600">Browser push notifications for real-time updates</p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => handleNotificationUpdate("push", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences */}
        <TabsContent value="preferences">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  Account Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                        <SelectItem value="cad">CAD ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="est">
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="est">Eastern Time (EST)</SelectItem>
                        <SelectItem value="cst">Central Time (CST)</SelectItem>
                        <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                        <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                  <h3 className="font-medium text-red-800 mb-2">Delete Account</h3>
                  <p className="text-sm text-red-600 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
