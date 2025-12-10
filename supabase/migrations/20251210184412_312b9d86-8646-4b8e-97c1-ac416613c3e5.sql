-- Create rental_requests table
CREATE TABLE public.rental_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  item_id UUID NOT NULL REFERENCES public.items(id) ON DELETE CASCADE,
  renter_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_price NUMERIC NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.rental_requests ENABLE ROW LEVEL SECURITY;

-- Owners can view requests for their items
CREATE POLICY "Owners can view requests for their items"
ON public.rental_requests
FOR SELECT
USING (auth.uid() = owner_id OR auth.uid() = renter_id);

-- Renters can create requests
CREATE POLICY "Users can create rental requests"
ON public.rental_requests
FOR INSERT
WITH CHECK (auth.uid() = renter_id);

-- Owners can update request status
CREATE POLICY "Owners can update request status"
ON public.rental_requests
FOR UPDATE
USING (auth.uid() = owner_id);

-- Add trigger for updated_at
CREATE TRIGGER update_rental_requests_updated_at
BEFORE UPDATE ON public.rental_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();